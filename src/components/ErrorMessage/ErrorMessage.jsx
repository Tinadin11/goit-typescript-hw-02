import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <p className={css.errorText}>{message}</p>;
};

export default ErrorMessage;
