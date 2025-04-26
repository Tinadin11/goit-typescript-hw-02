import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../App/App.types";
import css from "./ImageGallery.module.css";


type ImageGalleryProps = {
  gallery: Image[];
  updateModal: (url: string, alt: string) => void;
  openModal: () => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ gallery, updateModal, openModal }) => {
  return (
    <ul className={css.itemsContainer}>
      {gallery.map(({ id, alt_description, urls }, index) => {
        const key = `${id}-${index}`; //console.log(key);
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
