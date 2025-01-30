import { defineCollection, z } from "astro:content";
// z --> zod schema validador
// Contenido como Markdown (type: 'content') o formatos de datos como JSON o YAML (type: 'data').

const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), 
    hero: z.object({
      title: z.string(), 
      subtitle: z.string(),
      gallery: z.array(z.string()),
    }),
    // headerImage: z.string().optional(), 
    // intro: z.object({
    //   subtitle: z.string(), 
    //   description: z.string().optional(), 
    // }),
    // gallery: z.array(z.string()), 
    projectsSection: z.object({
      title: z.string(), 
      imageLg: z.string(), 
      imageSm: z.string(),
      cta: z.object({
        text: z.string(),
        url: z.string(),
      }),
    }),
    services: z.array(
      z.object({
        category: z.string(), 
        button: z.object({
          link: z.string(), 
          text: z.string(), 
        }),
        steps: z.array(
          z.object({
            number: z.string(), 
            title: z.string(), 
            list: z.array(z.string()), 
          })
        ),
      })
    ),
  }),
});

  export const projectsCollection = {
    proyectos: defineCollection({
      schema: z.object({
        pageTitle: z.string(), 
        anchors: z.array(z.string()), 
        projectsList: z.array(
          z.object({
            title: z.string(),
            sector: z.string(),
            location: z.string(),
            collaboration: z.string(),
            images: z.array(
              z.object({
                url: z.string().url(),    
                alt: z.string(),  
                name: z.string(), 
                width: z.number(),  
                height: z.number(),
              })
            ),
          })
        ),
      }),
    }),
  };

  const studioCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      // headerImage: z.string().optional(),
      hero: z.object({
        title: z.string(), 
        subtitle: z.string(),
        gallery: z.array(z.string()),
      }),
      gallery: z.array(z.string()),
      quotes: z.object({
        heading: z.string(),
        items: z.array(z.string()),
        cta: z.object({
          text: z.string(),
          url: z.string(),
        }),
      }),
      marquee: z.object({
        text: z.string(),
        url: z.string(),
      }),
      footerImage:z.string(),
    }),
  });

  const contactCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
    })
  });

  const privacyCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    })
  });

  const cookiesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    })
  });
  
  export const collections = {
    home: homeCollection,
    proyectos: projectsCollection,
    estudio: studioCollection,
    contacto: contactCollection,
    privacidad: privacyCollection,
    cookies: cookiesCollection,
  };