import { defineCollection, z } from "astro:content";

const simpleTitleSchema = z.object({
  title: z.string(),
});

const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(), 
    hero: z.object({
      title: z.string(), 
      subtitle: z.string(),
      gallery: z.array(z.string()),
    }),
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
          type: z.enum(['solid', 'outline']),
          link: z.string(), 
          text: z.string(), 
        }),
        steps: z.array(
          z.object({
            number: z.string(), 
            title: z.string(), 
            list: z.array(z.string()), 
          })
        ).optional(),
      })
    ),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    anchors: z.array(z.string()), 
    projectsList: z.array(
      z.object({
        title: z.string(),
        sector: z.string(),
        location: z.string(),
        collaboration: z.string(),
        images: z.array(
          z.object({
            url: z.string(),    
            alt: z.string(),  
            name: z.string(), 
            width: z.number().optional(),  
            height: z.number().optional(),
          })
        ),
      })
    ),
  }),
});

  const studioCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string().optional(), 
      hero: z.object({
        title: z.string(), 
        subtitle: z.string().optional(),
        gallery: z.array(z.string()),
      }),
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
    schema: simpleTitleSchema,
  });

  const cookiesCollection = defineCollection({
    type: 'content',
    schema: simpleTitleSchema,
  });

  const legalCollection = defineCollection({
    type: 'content',
    schema: simpleTitleSchema,
  });
  
  export const collections = {
    home: homeCollection,
    proyectos: projectsCollection,
    estudio: studioCollection,
    contacto: contactCollection,
    privacidad: privacyCollection,
    cookies: cookiesCollection,
    legal: legalCollection,
  };