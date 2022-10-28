import React, { useState } from "react";
import { useForm } from "../../Shared/hooks/form-hook";
import { useEffect } from "react";
import Input from "../../Shared/components/FormElements/Input";
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

  const DUMMY_PLACES = [
    {
      id: "p1",
      creator: "u1",
      title: "Faculty Of Computing and Inforation Technology - NC",
      description:
        "Offers a diverse knowledge in Computer Science and Related Fields",
      imageURL: "https://pucit.edu.pk/wp-content/uploads/2021/09/dap9_n-1.jpg",
      address:
        "F7J8+53W, Samsani Road, Quaid-i-Azam Campus, لاہور, Lahore, پنجاب",
      location: {
        lat: 31.4804833,
        lng: 74.2630103,
      },
    },
    {
      id: "p2",
      creator: "u2",
      title: "Faculty Of Computing and Inforation Technology - OC",
      description:
        "Offers a diverse knowledge in Computer Science and Related Fields",
      imageURL:
        "https://dailytimes.com.pk/assets/uploads/2022/07/29/2560px-Punjab_University-768x432.jpg",
      address: "Katchery Road، Near Anarkali Bazar، Lahore, 54000, Pakistan",
      location: {
        lat: 31.5703641,
        lng: 74.3074407,
      },
    },
  ];

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

  
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(()=>{
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
    )

    setIsLoading(false)
  
  }, [identifiedPlace.title, identifiedPlace.description, setFormData])

  const placeUpdateSubmitHandler = event =>{
    event.preventDefault();
    console.log(formstate.inputs);
  }
  
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>No Place With This Id Found</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading....</h2>
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
