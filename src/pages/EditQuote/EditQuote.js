import React from "react";
import {
  useSearchParams,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./EditQuote.css";
import { Formik } from "formik";
import * as yup from "yup";
//
function EditQuote() {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const [quote, SetQuote] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, SetIsLoading] = useState(true);
  const token = localStorage.getItem("auth_token");
  let Done = (values) => {
    fetch("https://js-course-server.onrender.com/quotes/edit/" + params.id, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          alert(data.message);
        } else {
          alert("Uspesno ste editovali citat");
          navigate("/");
        }
      })
      .catch((error) => {
        alert("nesto nije u redu", error);
      });
  };

  let getQuotes = () => {
    fetch(
      "https://js-course-server.onrender.com/quotes/get-quote/" + params.id + ""
    )
      .then((res) => res.json())
      .then((data) => {
        SetQuote(data);
        setAuthor(data.quoteAuthor);
        setText(data.quoteText);
        setSource(data.quoteSource);

        console.log(data);
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  };
  useEffect(() => {
    getQuotes();
  }, []);

  const EditQuoteScheme = yup.object({
    quoteText: yup
      .string()
      .required("Polje za QuoteText mora biti popunjeno")
      .min(6, "QuoteText ne moze imati manje od 6 karaktera")
      .max(50, "QuoteText ne sme biti duza od 50 karaktera"),
    quoteAuthor: yup
      .string()
      .required("Polje za QuoteAuthor mora biti popunjeno")
      .min(3, "QuoteAuthor ne moze imati manje od 3 karaktera")
      .max(50, "QuoteAuthor ne sme biti duza od 50 karaktera"),
    quoteSource: yup
      .string()
      .required("Polje za QuoteAuthor mora biti popunjeno")
      .min(3, "QuoteAuthor ne moze imati manje od 3 karaktera")
      .max(50, "QuoteAuthor ne sme biti duza od 50 karaktera"),
  });
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="login-wrapper">
      <h1>Edit quote page</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          quoteText: text,
          quoteAuthor: author,
          quoteSource: source,
        }}
        onSubmit={(values, actions) => {
          Done(values);
          // actions.resetForm();
        }}
        validationSchema={EditQuoteScheme}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <button
              onClick={() => {
                console.log(values, "errors");
                // console.log(touched, "touched");
              }}
            >
              Console log states
            </button>
            <div>
              <input
                type="text"
                name="quoteText"
                placeholder="QuoteText"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quoteText}
              />
              <p className="error-message">
                {errors.quoteText && touched.quoteText && errors.quoteText}
              </p>
            </div>
            <div>
              <input
                type="text"
                name="quoteAuthor"
                placeholder="QuoteAuthor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quoteAuthor}
              />
              <p className="error-message">
                {errors.quoteAuthor &&
                  touched.quoteAuthor &&
                  errors.quoteAuthor}
              </p>
            </div>

            <div>
              {" "}
              <input
                type="text"
                name="quoteSource"
                placeholder="quoteSource"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quoteSource}
              />
              <p className="error-message">
                {errors.quoteSource &&
                  touched.quoteSource &&
                  errors.quoteSource}
              </p>
            </div>
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default EditQuote;
