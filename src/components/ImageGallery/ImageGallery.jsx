import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ gallery, updateModal, openModal }) => {
  return (
    <ul className={css.itemsContainer}>
      {gallery.map(({ id, alt_description, urls }, index) => {
        const key = `${id}-${index}`; // -- додано індекс, бо я ніфіга не розумію з тими помилками
        // console.log(key);
        return (
          <li className={css.cardItem} key={key} onClick={openModal}>
            <ImageCard
              urls={urls}
              alt_description={alt_description}
              updateModal={updateModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
