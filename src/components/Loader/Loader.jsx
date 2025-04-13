import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <ClipLoader color="#3f51b5" size={50} />
    </div>
  );
};

export default Loader;
