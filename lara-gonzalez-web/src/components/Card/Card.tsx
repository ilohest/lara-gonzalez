import React from "react";
import "./Card.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "../heading/Heading";


interface Card {
  title: string;
  list: string[];
}

export const Card = ({
  card,
  index,
}: {
  card: Card;
  index: number;
  key: number;
}) => {
  return (
    <article className="card swiper-slide">
        <div className="card__header">
          <span className="card__inner-step">Fase 0{index + 1}</span>
          <Heading tag="h3" size="base" headingFontWeight={600}>{card.title}</Heading>
        </div>
        <ul className="card__list">
          {card.list.map((listItem, i) => (
            <li key={`${listItem}-${i}`}>
              {listItem}
            </li>
          ))}
        </ul>
 
    </article>
  );
};

export default Card;
