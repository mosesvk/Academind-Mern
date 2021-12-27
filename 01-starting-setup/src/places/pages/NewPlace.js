import React, { useCallback } from "react";

import Input from "../../SHARED/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../SHARED/util/validators";
import "./NewPlace.css";

const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {
    
  }, []);

  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={titleInputHandler}
      />
    </form>
  );
};

export default NewPlace;
