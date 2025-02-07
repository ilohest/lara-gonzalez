import React from "react";
import Heading from "@lara/components/heading/Heading";
import ImageSlider from "../image/ImageSlider";

export interface Project {
  title: string;
  sector: string;
  location: string;
  collaboration: string;
  images: string[];
}

const ProjectList = ( { projectsList }: any) => {
  return (
    <>
      {projectsList.map((project: any, index: number) => (
        <div
          key={project.title}
          id={project.title.toLowerCase().replace(/\s+/g, "-")}
        >
          <Heading tag="h2" size="md" headingFontWeight={600}>
            {project.title}
          </Heading>
          <p>
            <strong>Sector:</strong> {project.sector}
          </p>
          <p>
            <strong>Ubicación:</strong> {project.location}
          </p>
          <p>
            <strong>Colaboración:</strong> {project.collaboration}
          </p>
          <ImageSlider images={project.images} index={index} />
        </div>
      ))}
    </>
  );
};

export default ProjectList;
