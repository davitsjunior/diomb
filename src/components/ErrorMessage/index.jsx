import './styles.css';

export const ErrorMessage = ({ message }) => {
    return (
      <div className="error-message">
        <div className="error-content">
          <p>{message}</p>
        </div>
      </div>
    );
  };