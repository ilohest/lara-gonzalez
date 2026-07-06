<?php
/**
 * Endpoint de envío del formulario de contacto de laragonzalez.com
 *
 * Recibe el POST del formulario (FormData), valida, y envía dos correos
 * HTML con la imagen del estudio, mediante el servidor de correo del hosting:
 *   1. Notificación al estudio (To: hola@). Se envía desde web@laragonzalez.com
 *      (NO desde hola@) para que el filtro de la propia bandeja no lo marque
 *      como spam ("correo de mí para mí"). Reply-To = visitante.
 *   2. Acuse de recibo al visitante, desde hola@laragonzalez.com.
 *
 * Autenticación de dominio ya configurada (SPF + DKIM + DMARC), por lo que
 * los correos, al salir del propio servidor con From @laragonzalez.com, pasan
 * DMARC. No se necesitan credenciales SMTP.
 *
 * Responde JSON { ok: true|false, message: "..." } — el front comprueba res.ok.
 */

header('Content-Type: application/json; charset=utf-8');

// --- Solo POST ---
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método no permitido']);
    exit;
}

// --- Anti-spam: honeypot (campo oculto con display:none; debe quedar vacío) ---
if (!empty($_POST['botcheck'])) {
    echo json_encode(['ok' => true, 'message' => '¡Gracias! Tu mensaje ha sido enviado correctamente.']);
    exit;
}

// --- Campos ---
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$company = trim($_POST['company'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Faltan campos obligatorios.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $name . $email)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'El email no es correcto.']);
    exit;
}

// --- Configuración ---
$owner_email  = 'hola@laragonzalez.com'; // buzón que lee Lara (destinatario)
$sender_email = 'web@laragonzalez.com';  // remitente de la notificación (evita spam)
$from_name    = 'Estudio Lara González';
$logo         = 'https://www.laragonzalez.com/static-icons/lara-gonzalez-email.png';

function h(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

/** Envuelve el contenido en la plantilla estilizada con el logo en la firma. */
function email_shell(string $inner, string $logo): string {
    return
    '<div style="background:#f4f4f2;padding:32px 12px;font-family:Helvetica,Arial,sans-serif;">' .
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">' .
        '<tr><td style="padding:44px 44px 8px;">' . $inner . '</td></tr>' .
        '<tr><td style="padding:36px 44px 44px;">' .
          '<div style="border-top:1px solid #ececec;padding-top:26px;">' .
            '<img src="' . $logo . '" alt="Lara González estudio" width="220" style="display:block;border:0;margin:0 0 14px;">' .
            '<p style="font-size:12px;color:#999;line-height:1.7;margin:0;">' .
              '<a href="https://www.laragonzalez.com" style="color:#111;text-decoration:none;">laragonzalez.com</a>' .
              '&nbsp;·&nbsp; hola@laragonzalez.com' .
            '</p>' .
          '</div>' .
        '</td></tr>' .
      '</table>' .
    '</div>';
}

$label = 'font-size:11px;color:#999;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 10px;';
$quote = 'border-left:2px solid #111;padding:2px 0 2px 18px;color:#444;font-size:15px;line-height:1.65;';

// ----------------------------------------------------------------------
// Correo 1: notificación para el estudio
// ----------------------------------------------------------------------
$row = function (string $k, string $v): string {
    if ($v === '') return '';
    return '<p style="font-size:15px;color:#333;margin:0 0 6px;"><span style="color:#999;">' . $k . ':</span> ' . h($v) . '</p>';
};

$inner_owner =
    '<p style="' . $label . '">Nuevo mensaje desde laragonzalez.com</p>' .
    $row('Nombre', $name) .
    $row('Email', $email) .
    $row('Teléfono', $phone) .
    $row('Empresa', $company) .
    '<p style="' . $label . 'margin-top:22px;">Mensaje</p>' .
    '<div style="' . $quote . '">' . nl2br(h($message)) . '</div>';

$subject_owner = mb_encode_mimeheader('Nuevo mensaje de contacto — ' . $name);
$headers_owner  = "MIME-Version: 1.0\r\n";
$headers_owner .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers_owner .= 'From: ' . mb_encode_mimeheader($from_name) . ' <' . $sender_email . '>' . "\r\n";
$headers_owner .= 'Reply-To: ' . mb_encode_mimeheader($name) . ' <' . $email . '>' . "\r\n";

$sent_owner = mail($owner_email, $subject_owner, email_shell($inner_owner, $logo), $headers_owner, '-f' . $owner_email);

// ----------------------------------------------------------------------
// Correo 2: acuse de recibo para el visitante
// ----------------------------------------------------------------------
$inner_visitor =
    '<p style="font-size:16px;color:#111;margin:0 0 18px;">Hola ' . h($name) . ',</p>' .
    '<p style="font-size:15px;line-height:1.65;color:#333;margin:0 0 26px;">' .
      '¡Gracias por ponerte en contacto! Hemos recibido tu mensaje y te responderemos lo antes posible.' .
    '</p>' .
    '<p style="' . $label . '">Tu mensaje</p>' .
    '<div style="' . $quote . '">' . nl2br(h($message)) . '</div>';

$subject_visitor = mb_encode_mimeheader('Hemos recibido tu mensaje — ' . $from_name);
$headers_visitor  = "MIME-Version: 1.0\r\n";
$headers_visitor .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers_visitor .= 'From: ' . mb_encode_mimeheader($from_name) . ' <' . $owner_email . '>' . "\r\n";
$headers_visitor .= 'Reply-To: ' . $owner_email . "\r\n";

@mail($email, $subject_visitor, email_shell($inner_visitor, $logo), $headers_visitor, '-f' . $owner_email);

// ----------------------------------------------------------------------
// Respuesta
// ----------------------------------------------------------------------
if ($sent_owner) {
    echo json_encode(['ok' => true, 'message' => '¡Gracias! Tu mensaje ha sido enviado correctamente.']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Se ha producido un error al enviar la consulta.']);
}
