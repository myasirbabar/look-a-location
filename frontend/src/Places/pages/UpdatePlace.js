import React, { useState } from "react";
import { useForm } from "../../Shared/hooks/form-hook";
import { useEffect } from "react";
import Input from "../../Shared/components/FormElements/Input";
import Card from '../../Shared/components/UIElements/Card'

import Button from "../../Shared/components/FormElements/Button";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/components/util/Validators";

import "./PlaceForm.css";

const UpdatePlace = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().pid;

  
  
  const [formstate, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    true
  );

  
  
  useEffect(()=>{
    if(identifiedPlace){
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        }, true
      );
    }

    setIsLoading(false)
  
  }, [identifiedPlace && identifiedPlace.title ,identifiedPlace && identifiedPlace.description , setFormData])

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>No Place With This Id Found</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = event =>{
    event.preventDefault();
    console.log(formstate.inputs);
  }
  

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Loading....</h2>
        </Card>
      </div>
    );
  }


  return (
    <form className="place-form"  onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        value={formstate.inputs.title.value}
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please Input a valid Title"
        valid={formstate.inputs.title.isValid}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        value={formstate.inputs.description.value}
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please Input a valid Description. Min 5 Characters"
        valid={formstate.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formstate.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
