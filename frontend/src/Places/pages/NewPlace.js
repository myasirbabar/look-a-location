import React from "react";
import Input from "../../Shared/components/FormElements/Input";
import Button from "../../Shared/components/FormElements/Button";
import { useForm } from "../../Shared/hooks/form-hook";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/components/util/Validators";

import "./PlaceForm.css";

const NewPlace = () => {
 
  const [formstate, inputHandler] = useForm({
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    }, false
  );

 
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formstate.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
        type = "text"
        placeholder="Enter Address"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Enter a Valid Address"
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formstate.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
