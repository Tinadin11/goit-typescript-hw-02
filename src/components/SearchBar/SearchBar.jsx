import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import { TbPhotoSearch } from "react-icons/tb";

import css from "./SearchBar.module.css";

const initialValues = { query: "" };

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.header}>
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
    </header>
  );
};

export default SearchBar;
