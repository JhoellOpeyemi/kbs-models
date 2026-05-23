import "./styledInput.css";

import { InputHTMLAttributes } from "react";

type StyledInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  type: string;
  error?: string;
};

const StyledInput = ({
  label,
  id,
  type,
  error,
  ...inputProps
}: StyledInputProps) => {
  return (
    <div className="styled-input-container">
      <label htmlFor={id} className="styled-input-label">
        {label}
      </label>
      {type === "text" && id !== "previous-agency" && (
        <input
          {...inputProps}
          id={id}
          type={type}
          className="styled-input"
          required
        />
      )}
      {type === "email" && (
        <input
          {...inputProps}
          id={id}
          type={type}
          className="styled-input"
          required
        />
      )}
      {type === "file" && (
        <input
          {...inputProps}
          id={id}
          type={type}
          accept=".jpeg, .jpg, .png"
          className="styled-input"
          required
        />
      )}
      {type === "tel" && (
        <input
          {...inputProps}
          id={id}
          type={type}
          className="styled-input"
          required
        />
      )}
      {type === "number" && id === "age" && (
        <input
          {...inputProps}
          id={id}
          type={type}
          min="2"
          max="80"
          step="1"
          className="styled-input"
          required
        />
      )}

      {type === "text" && id === "previous-agency" && (
        <input {...inputProps} id={id} type={type} className="styled-input" />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default StyledInput;
