import React from "react";
import "./Card.scss";
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
}) => {
  return (
    <article className="card">
      <div className="card__inner">
  
        <p className="inner-top__number">Fase {index + 1}</p>
        <Heading tag="h5" size="base" headingFontWeight={900}>{card.title}</Heading>
   
        <section className="inner-bottom">
          <ul className="inner-bottom__list">
            {card.list.map((listItem, i) => (
              <p key={`${listItem}-${i}`} className="list-item">
                {listItem}
              </p>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default Card;
