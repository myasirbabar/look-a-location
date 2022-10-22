import React from "react";
import Input from "../../Shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Shared/components/util/Validators";

import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        placeholder="Enter Title"
        label="Title"
        validators = {[VALIDATOR_REQUIRE()]}
        errorText = "Please Enter a Valid Title"
      />
    </form>
  );
};

export default NewPlace;
