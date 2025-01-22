import { defineCollection, z } from "astro:content";
// z --> zod schema validador
// Contenido como Markdown (type: 'content') o formatos de datos como JSON o YAML (type: 'data').
// TODO: Revisar los types

const homeCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
    })
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
        description: z.string(),
    })
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
        description: z.string(),
    })
  });

  const cookiesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
    })
  });
  
  export const collections = {
    //home: homeCollection,
    proyectos: projectsCollection,
    "el-estudio": studioCollection,
    contacto: contactCollection,
    privacidad: privacyCollection,
    cookies: cookiesCollection,
  };