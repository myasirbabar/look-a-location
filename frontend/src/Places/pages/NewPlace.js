import React, { useCallback, useReducer } from "react";
import Input from "../../Shared/components/FormElements/Input";
import Button from "../../Shared/components/FormElements/Button";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/components/util/Validators";

import "./NewPlace.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};
const NewPlace = () => {
  const [formstate, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },

    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      inputId: id,
      isValid: isValid,
    });
  }, []);

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
