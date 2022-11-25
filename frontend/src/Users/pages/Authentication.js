import React, { useContext, useState } from "react";
import { AuthContext } from "../../Shared/context/auth-context";
import Card from "../../Shared/components/UIElements/Card";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import Input from "../../Shared/components/FormElements/Input";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import Button from "../../Shared/components/FormElements/Button";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLogin) {
      // Sending Request To Backend for Login
      let response;
      try {
        response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        auth.login();
      } catch (error) {
        console.log(error);
        setError(error.message || "Unknown error occured");
      }
    } else {
      // Sending Request To Backend for signup
      let response;
      try {
        response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message);
        }

        auth.login();
      } catch (error) {
        console.log(error);
        setError(error.message || "Unknown error occured");
      }
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={() => {
          setError(null);
        }}
      />
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
