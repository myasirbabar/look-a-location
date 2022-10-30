import React from "react";
import Card from "../../Shared/components/UIElements/Card";
import Button from "../../Shared/components/FormElements/Button";
import Modal from "../../Shared/components/UIElements/Modal";
import Map from "../../Shared/components/UIElements/Map";
import { AuthContext } from "../../Shared/context/auth-context";
import { useState, useContext } from "react";

import "./PlaceItem.css";

const PlaceItem = ({ place }) => {
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showDeleteWarningHandler = () => setShowConfirm(true);
  const cancelDeleteWarningHandler = () => setShowConfirm(false);
  const confirmDeleteHandler = () => {
    console.log("Deleteing....");
    setShowConfirm(false);
  };

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Button danger onClick={closeMapHandler}>
            Close
          </Button>
        }
      >
        <div className="map-container">
          <Map center={place.location} zoom={18} />
        </div>
      </Modal>

      <Modal
        show={showConfirm}
        onCancel={cancelDeleteWarningHandler}
        header="Are You Sure ? "
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do You Want To Proceed And Delete This Place. This Action Cant be
          undone
        </p>
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
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${place.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
