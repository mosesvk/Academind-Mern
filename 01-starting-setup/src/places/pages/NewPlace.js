import React, { useCallback, useReducer } from "react";

import Input from "../../SHARED/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../SHARED/util/validators";
import "./NewPlace.css";

const formReducer = (state, reducer) => {
  switch (action.type) {
    case 'INPUT_CHANGE': 
      let formIsValid = true;
      for (const input in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        input: {
          ...state.inputs,
          
        }
      }
    default: 
      return state
  }
}

const NewPlace = () => {
  useReducer(formReducer, {
    inputs: {
      title: {
        value: '', 
        isValid: false
      },
      description: {
        value: '', 
        isValid: false
      }
    },
    isValid: false
  });

  const titleInputHandler = useCallback((id, value, isValid) => {

  }, []);

  const descriptionInputHandler = useCallback((id, value, isValid) => {

  }, []);

  return (
    <form className="place-form">
      <Input
        id='title'
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_LENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
