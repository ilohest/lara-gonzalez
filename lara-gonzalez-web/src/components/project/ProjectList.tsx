import React from "react";
import Heading from "@lara/components/heading/Heading";
import './PorjectList.scss';
import ImageSlider from "../slider/ImageSlider";

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

          <div className="project-list__heading-detail">
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
          <ImageSlider images={project.images} index={index} />
        </div>
      ))}
    </>
  );
};

export default ProjectList;
