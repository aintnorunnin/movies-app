import React, { ChangeEvent, useReducer } from "react";

interface VALIDATECONFIG {
  validate: (content: string) => boolean;
  error: string;
}

const DEFAULT_INPUT_STATE = {
  value: "",
  isValid: false,
  wasTouched: false,
  error: "",
};

const useInput = (validateConfig: VALIDATECONFIG) => {
  const [inputState, dispatchForm] = useReducer(
    formReducer,
    DEFAULT_INPUT_STATE
  );

  function valueChangeHandler(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    dispatchForm({ type: "update", value: event.target.value });
  }

  function inputBlurHandler(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) {
    let errorMessage = "";
    let isValid = true;
    if (!validateConfig.validate(inputState.value)) {
      errorMessage = validateConfig.error;
      isValid = false;
    }
    dispatchForm({ type: "validate", error: errorMessage, isValid: isValid });
  }

  function resetInput() {
    dispatchForm({ type: "default" });
  }

  return {
    state: inputState,
    onBlur: inputBlurHandler,
    onChange: valueChangeHandler,
    resetInput: resetInput,
  };
};

function formReducer(prevState: any, action: any) {
  switch (action.type) {
    case "update":
      return {
        ...prevState,
        value: action.value,
      };

    case "validate":
      return {
        ...prevState,
        isValid: action.isValid,
        wasTouched: true,
        error: action.error,
      };

    default:
      return DEFAULT_INPUT_STATE;
  }
}

export default useInput;
