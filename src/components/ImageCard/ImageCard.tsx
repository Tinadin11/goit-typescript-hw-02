import css from "./ImageCard.module.css";

//типізую компонент
type ImageCardProps = {
  alt_description?: string;
  urls: {
    small: string;
    regular: string;
  };
  updateModal: (src: string, alt: string) => void;
};

const ImageCard = ({ alt_description, urls, updateModal }: ImageCardProps) => {
  const handleClick = () => {
    updateModal(urls.regular, alt_description || "");
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


// з 4ї дз
//import css from "./ImageCard.module.css";
// const ImageCard = ({ alt_description, urls, updateModal }) => {
//   const handleClick = () => {
//     updateModal(urls.regular, alt_description);
//   };
//   return (
//     <div className={css.cardWrapper} onClick={handleClick}>
//       <img
//         className={css.cardImage}
//         src={urls.small}
//         alt={alt_description || "Image preview"}
//         loading="lazy"
//       />
//       <p className={css.cardDescription}>{alt_description}</p>
//     </div>
//   );
// };
// export default ImageCard;
