import React, { useContext, useState } from "react";
import { useForm } from "../../Shared/hooks/form-hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Shared/components/FormElements/Input";
import Card from "../../Shared/components/UIElements/Card";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import Button from "../../Shared/components/FormElements/Button";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/components/util/Validators";

import "./PlaceForm.css";

const UpdatePlace = (props) => {
  const auth = useContext(AuthContext);
  const placeId = useParams().pid;

  const [identifiedPlace, setIdentifiedPlace] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formstate, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const resdata = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setIdentifiedPlace(resdata.place);
        setFormData(
          {
            title: {
              value: resdata.place.title,
              isValid: true,
            },
            description: {
              value: resdata.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const history = useNavigate();

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!isLoading && !identifiedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>No Place With This Id Found</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formstate.inputs.title.value,
          description: formstate.inputs.description.value
        }),
        {
          'content-type':'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );

      history('/' + auth.userId + '/places');
    } catch (error) {}

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && identifiedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            value={identifiedPlace.title}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Input a valid Title"
            valid={true}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            value={identifiedPlace.description}
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Input a valid Description. Min 5 Characters"
            valid={true}
          />

          <Button type="submit" disabled={!formstate.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
