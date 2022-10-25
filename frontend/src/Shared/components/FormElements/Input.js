import React, { useEffect } from "react";
import { useReducer } from "react";
import {validate} from '../util/Validators';

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
        return {
            ...state, 
            isTouched: true
        };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const {id, onInput } = props;
  const {value, isValid} = inputState;

  useEffect(()=>{
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const inputChangeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value, validators:props.validators });
  };

  const touchHandler = () =>{ dispatch({type:"TOUCH" })}

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        value={inputState.value}
        onBlur = {touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={inputChangeHandler}
        value={inputState.value}
        onBlur = {touchHandler}
      ></textarea>
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p> {props.errorText} </p>}
    </div>
  );
};

export default Input;
