import { useEffect, useState, useMemo, useRef } from "react";
import { fetchImages } from "../API/Api.js";
import { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

import css from "./App.module.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");
  const ref = useRef();

  useEffect(() => {}, [isError]);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchImages(query, page);
        if (data.total === 0) {
          setImages([]);
          return;
        }

        setImages((prev) => [...prev, ...data.results]);

        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [page, images]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const isActive = useMemo(() => page === totalPages, [page, totalPages]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateModal = (src, alt) => {
    setModalImage(src);
    setAltDescription(alt);
    // openModal();
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
      {isError && <ErrorMessage message="Oops! Something's wrong " />}

      {images.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn onClick={handleLoadMore} isActive={isActive} />
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
