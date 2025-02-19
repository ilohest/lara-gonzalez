import React from "react";
import Heading from "@lara/components/heading/Heading";
import './ProjectItem.scss';
import ImageSlider from "../slider/ImageSlider";

export interface Project {
  title: string;
  sector: string;
  location: string;
  collaboration: string;
  images: string[];
}

const ProjectItem = ( { projectitem }: any) => {
  return (
    <div className="projects__items">
      {projectitem.map((project: any, index: number) => (
          <div
            className="projects__item"
            key={project.title}
            id={project.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-")}
          >

          <div className="projects__header">
            <Heading tag="h2" size="sm" headingFontWeight={600}>
              {project.title}
            </Heading>
            <div className="projects__item__heading-detail">
              {project.sector &&
                <p>
                  {project.sector}
                </p>
              }
              {project.location &&
                <p>
                  {project.location}
                </p>
              }
              {project.collaboration &&
                <p>
                  {project.collaboration}
                </p>
              }
            </div>
          </div>
          <ImageSlider images={project.images} index={index} />
        </div>
      ))}
    </div>
  );
};

export default ProjectItem;
