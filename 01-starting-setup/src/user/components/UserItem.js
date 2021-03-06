import React from "react";
import { Link } from "react-router-dom";

import Card from '../../SHARED/components/UIElements/Card'
import Avatar from "../../SHARED/components/UIElements/Avatar";
import "./UserItem.css";

export const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`} >
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} width={props.width} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};
