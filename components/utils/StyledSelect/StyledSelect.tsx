import "./styledSelect.css";

import { SelectHTMLAttributes } from "react";

type StyledSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  options: string[];
  error?: string;
};

const StyledSelect = ({
  label,
  id,
  options,
  error,
  ...selectProps
}: StyledSelectProps) => {
  return (
    <div className="styled-select-container">
      <label htmlFor={id} className="styled-input-label">
        {label}
      </label>
      <select {...selectProps} id={id} className="styled-select">
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default StyledSelect;
