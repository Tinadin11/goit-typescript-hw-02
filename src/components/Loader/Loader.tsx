import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

//типізую лодер (хай буде)
const Loader: React.FunctionComponent = () => {
  return (
    <div className={css.loaderWrapper}>
      <ClipLoader color="#3f51b5" size={50} />
    </div>
  );
};

export default Loader;
