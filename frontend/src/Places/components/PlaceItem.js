import React from "react";
import Card from "../../Shared/components/UIElements/Card";
import Button from "../../Shared/components/FormElements/Button";
import Modal from "../../Shared/components/UIElements/Modal";
import Map from "../../Shared/components/UIElements/Map";

import { useState } from "react";

import "./PlaceItem.css";

const PlaceItem = ({ place }) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass = "place-item__modal-actions"
        footer = {<Button danger onClick = {closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
            <Map center = {place.location} zoom = {18}/>
        </div>
      </Modal>

      <li className="place-item">
        <Card className="place-item">
          <div className="place-item__image">
            <img src={place.imageURL} alt={place.title} />
          </div>

          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>

          <div className="place-item__actions">
            <Button inverse onClick ={openMapHandler}>View On Map</Button>
            <Button to={`/places/${place.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
