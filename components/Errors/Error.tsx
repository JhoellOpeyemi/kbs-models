import "./error.css";

interface ErrorsProps {
  label: string;
}

export const HomeModelError = () => {
  return (
    <div className="home-model-error-container">
      <h2 className="home-models-heading">Our Models</h2>
      <h3 className="home-model-error-title">Error Loading Models.</h3>
      <p className="home-model-error-prompt">Refresh the page and try again.</p>
    </div>
  );
};

export const Error = ({ label }: ErrorsProps) => {
  return (
    <div className="error-container">
      <h3 className="error-title">Error Loading {label}.</h3>
      <p className="error-prompt">
        Please check your connection and try again!
      </p>
    </div>
  );
};
