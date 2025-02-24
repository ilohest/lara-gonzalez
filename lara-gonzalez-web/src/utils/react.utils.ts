export const classList = (
  classes: { [key: string]: boolean },
  stringClasses?: string
): string => {
  const keys = Object.keys(classes);
  let result = "";
  keys.forEach((key) => {
    if (classes[key]) {
      result = `${result} ${key}`;
    }
  });
  const classesResult = `${result.trimEnd()}${
    stringClasses ? " " + stringClasses : ""
  }`;
  return classesResult.slice(0, 1) === " "
    ? classesResult.slice(1)
    : classesResult;
};

export const slugify = (str: string): string => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
};

export const wrapWordsInSpan = (
  str: string,
  append?: {
    value: string;
    className: string;
  },
  initialDelay = 0
) => {
  const words = str.trim().split(' ');
  const duration = words.length * 83;
  return (
    words
      .map(
        (word, i) =>
          `<span style="--animation-delay: ${
            initialDelay + i * (duration / str.split(' ').length)
          }ms">${word}</span>`
      )
      .join(' ') +
    (append
      ? `<span style="--animation-delay: ${
          initialDelay + words.length * (duration / words.length)
        }ms" class="${append.className}">${append.value}</span>`
      : '')
  );
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};