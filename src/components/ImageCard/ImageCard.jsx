import css from "./ImageCard.module.css";

const ImageCard = ({ alt_description, urls, updateModal }) => {
  const handleClick = () => {
    updateModal(urls.regular, alt_description);
  };

  return (
    <div className={css.cardWrapper} onClick={handleClick}>
      <img
        className={css.cardImage}
        src={urls.small}
        alt={alt_description || "Image preview"}
        loading="lazy"
      />
      <p className={css.cardDescription}>{alt_description}</p>
    </div>
  );
};

export default ImageCard;
