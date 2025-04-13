import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.globe.min";

import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import { TbPhotoSearch } from "react-icons/tb";
import css from "./SearchBar.module.css";

const initialValues = { query: "" };

const SearchBar = ({ onSubmit }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          color2: 0xa8ed7,
          color: 0x891ec8,
          backgroundColor: 0x1c1c37,
          size: 1.3,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <header className={`${css.header}`} ref={vantaRef}>
      <div className={css.formWrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            if (!values.query) {
              toast.error("Please enter the value in the search field");
              return;
            }
            onSubmit(values.query);
            actions.resetForm();
          }}
        >
          <Form className={css.form}>
            <Field
              className={css.input}
              type="search"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button className={css.btnSearch} type="submit">
              <TbPhotoSearch className={css.icon} />
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
};

export default SearchBar;
