import React, { useContext, useState } from "react";
import { AuthContext } from "../../Shared/context/auth-context";
import Card from "../../Shared/components/UIElements/Card";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import Input from "../../Shared/components/FormElements/Input";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import Button from "../../Shared/components/FormElements/Button";
import ImageUpload from "../../Shared/components/FormElements/ImageUpload";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/components/util/Validators";
import { useForm } from "../../Shared/hooks/form-hook";

import "./Authentication.css";

const Authentication = (props) => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      // Sending Request To Backend for Login
      try {
        const resdata = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(resdata.userId, resdata.token);
      } catch (error) {}
    } else {
      // Sending Request To Backend for signup
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const resdata = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        auth.login(resdata.userId, resdata.token);
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLogin ? "Login Required" : "Signup "}</h2>
        <hr />

        <form onSubmit={authSubmitHandler}>
          {!isLogin && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter a Valid Name"
              onInput={inputHandler}
            />
          )}

          {!isLogin && (
            <ImageUpload
              id="image"
              center={true}
              onInput={inputHandler}
              errorText="Please Input Valid Image"
            />
          )}

          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please Enter a Valid Email"
            onInput={inputHandler}
          />

          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please Enter a Valid Password (Minimum 5 characters)"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "Login" : "Signup"}
          </Button>
        </form>

        <Button inverse onClick={switchModeHandler}>
          Switch To {isLogin ? "Signup" : "Login"} Mode
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Authentication;
