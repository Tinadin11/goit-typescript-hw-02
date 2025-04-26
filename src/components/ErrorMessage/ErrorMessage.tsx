import css from "./ErrorMessage.module.css";

// типізую пропс повідомлення
type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ message }) => {
  return <p className={css.errorText}>{message}</p>;
};

export default ErrorMessage;

// з 4ї дх
//import css from "./ErrorMessage.module.css";

// const ErrorMessage = ({ message }) => {
//   return <p className={css.errorText}>{message}</p>;
// };

// export default ErrorMessage;
