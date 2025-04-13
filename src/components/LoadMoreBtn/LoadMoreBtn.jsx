import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, isActive }) => {
  return (
    <div className={css.wrapper}>
      <button className={css.loadMore} onClick={onClick} disabled={isActive}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
