import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;

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

    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

// Custom Hook's convention is it starts with lower case
export const useForm = (initialInputs, initialValidity) => {
  const [formstate, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,

    isValid: initialValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      inputId: id,
      isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputValues, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputValues,
      formIsValid: formValidity,
    });
  }, []);

  return [formstate, inputHandler, setFormData];
};
