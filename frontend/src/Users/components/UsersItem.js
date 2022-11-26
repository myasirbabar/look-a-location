import React from "react";
import "./css/UsersItem.css";
import Avatar from "../../Shared/components/UIElements/Avatar";
import Card from "../../Shared/components/UIElements/Card";
import { Link } from "react-router-dom";

const UsersItem = ({ user }) => {
  return (
    <li className="user-item">
      
      <Card className="user-item__content">

        <Link to={`/${user.id}/places`}>
          
          <div className="user-item__image">
            <Avatar image={`http://localhost:5000/${user.image}`} alt={user.name} />
          </div>
        
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>
              {user.places.length} {user.places.length === 1 ? "Place" : "Places"}
            </h3>
          </div>

        </Link>
      
      </Card>

    </li>
  );
};

export default UsersItem;
