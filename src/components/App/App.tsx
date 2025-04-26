import { useEffect, useState, useRef } from "react";
import { fetchImages } from "../API/Api";
import { Image } from "../App/App.types";
import { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./App.module.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const { data, totalPages } = await fetchImages(query, page);
        if (data.length === 0 && page === 1) {
          setImages([]);
          return;
        }

        setImages((prev) => [...prev, ...data]);
        setTotalPages(totalPages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page === 1) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [page, images]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const isActive = isLoading || isError;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateModal = (src: string, alt: string) => {
    setModalImage(src);
    setAltDescription(alt);
  };

  return (
    <div ref={ref} className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          gallery={images}
          openModal={openModal}
          updateModal={updateModal}
        />
      )}
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Oops! Something's wrong" />}

      {page < totalPages && !isLoading && !isError && (
        <LoadMoreBtn onClick={handleLoadMore} isActive={isLoading || isError} />
      )}

      {isModalOpen && (
        <ImageModal
          src={modalImage}
          alt={altDescription}
          onClose={closeModal}
        />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          className: css.toaster,
          duration: 3000,
          style: {
            background: "#2a2a2a",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          },
          error: {
            icon: "🚫",
          },
        }}
      />
    </div>
  );
};

export default App;

// import { useEffect, useState, useMemo, useRef } from "react";
// import { fetchImages } from "../API/Api";
// import { Toaster } from "react-hot-toast";
// import {Image} from "../App/App.types";

// import SearchBar from "../SearchBar/SearchBar";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import ImageModal from "../ImageModal/ImageModal";
// import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";

// import css from "./App.module.css";

// const App = () => {
// const [page, setPage] = useState(1);
// const [query, setQuery] = useState("");
// const [images, setImages] = useState<Image[]>([]);
// const [isLoading, setIsLoading] = useState(false);
// const [isError, setIsError] = useState(false);
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [modalImage, setModalImage] = useState("");
// const [altDescription, setAltDescription] = useState("");
// const ref = useRef<HTMLDivElement>(null);

// useEffect(() => {
//      if (!query) return;

// const loadImages = async () => {
//        try {
//          setIsLoading(true);
//          setIsError(false);

//          const data = await fetchImages(query, page);
//          if (data.length === 0 && page ===1) {
//           setImages([]);
//           return;
//         }

//          setImages((prev) => [...prev, ...data]);
//        } catch {
//          setIsError(true);
//        } finally {
//          setIsLoading(false);
//        }
//      };

//      loadImages();
//    }, [query, page]);

//    useEffect(() => {
//      if (page === 1) return;
//      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
//    }, [page, images]);

//    const handleSearch = (newQuery:string) => {
//      if (newQuery === query) return;
//      setQuery(newQuery);
//      setImages([]);
//      setPage(1);
//    };

//    const handleLoadMore = () => {
//      setPage((prev) => prev + 1);
//    };

//    const isActive = useMemo(() => false, []);

// const openModal = () => {
//      setIsModalOpen(true);
//    };

//    const closeModal = () => {
//      setIsModalOpen(false);
//    };

//    const updateModal = (src: string, alt: string) => {
//      setModalImage(src);
//      setAltDescription(alt);
//     // openModal();
//    };

//    return (
//      <div ref={ref} className={css.container}>
//        <SearchBar onSubmit={handleSearch} />
//        {images.length > 0 && (
//          <ImageGallery
//            gallery={images}
//            openModal={openModal}
//            updateModal={updateModal}
//          />
//        )}

//        {isLoading && <Loader />}
//        {isError && <ErrorMessage message="Oops! Something's wrong " />}

//        {images.length > 0 && !isLoading && !isError && (
//         <LoadMoreBtn onClick={handleLoadMore} isActive={isActive} />
//       )}
//        {isModalOpen && (
//          <ImageModal
//           src={modalImage}
//           alt={altDescription}
//           onClose={closeModal}
//         />
//       )}

//       <Toaster
//         position="top-right"
//          toastOptions={{
//            className: css.toaster,
//            duration: 3000,
//            style: {
//             background: "#2a2a2a",
//             color: "#fff",
//             padding: "12px 16px",
//             borderRadius: "8px",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//           },
//           error: {
//             icon: "🚫",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default App;
