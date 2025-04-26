import css from "./LoadMoreBtn.module.css";

// типізуємо 2 пропси, які використовуємо
type LoadMoreBtnProps = {
  onClick: () => void; 
  isActive: boolean; 
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, isActive }) => {
  return (
    <div className={css.wrapper}>
      <button className={css.loadMore} onClick={onClick} disabled={isActive}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
