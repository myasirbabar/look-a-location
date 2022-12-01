import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Shared/components/FormElements/Input";
import Button from "../../Shared/components/FormElements/Button";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../Shared/components/FormElements/ImageUpload";
import { useForm } from "../../Shared/hooks/form-hook";
import { AuthContext } from "../../Shared/context/auth-context";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/components/util/Validators";

import "./PlaceForm.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formstate, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', formstate.inputs.title.value);
    formData.append('description', formstate.inputs.description.value);
    formData.append('address', formstate.inputs.address.value);
    formData.append('creator', auth.userId);
    formData.append('image', formstate.inputs.image.value);
    
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        formData,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );

      history("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          placeholder="Enter Title"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a Valid Title"
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="textarea"
          placeholder="Enter Description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a Valid Description (Minimum '5' characters"
          onInput={inputHandler}
        />

        <Input
          id="address"
          element="input"
          type="text"
          placeholder="Enter Address"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a Valid Address"
          onInput={inputHandler}
        />

        <ImageUpload
          id="image"
          center={true}
          onInput={inputHandler}
          errorText="Please Input Valid Image"
        />

        <Button type="submit" disabled={!formstate.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
