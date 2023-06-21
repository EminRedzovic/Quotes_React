import React, { useEffect } from "react";
import "./AllQuotes.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quoteSlice } from "../../store/quoteSlice";

function AllQuotes() {
  const [isLoading, SetIsLoading] = useState(true);
  const authState = useSelector((state) => state.auth);
  const testSlice = useSelector((state) => state.test);
  const quoteState = useSelector((state) => state.quote);

  const dispach = useDispatch();

  console.log(authState);
  console.log(testSlice, "testSlice");

  const navigate = useNavigate();
  const deleteQuote = (id) => {
    fetch("https://js-course-server.onrender.com/quotes/delete/" + id, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("auth_token"),
      },
    }).then((response) => {
      window.location.reload();
    });
  };
  const AddQuote = () => {
    navigate("/addquote");
  };
  const details = (props) => {
    navigate("/quote/" + props + "");
  };
  const edit = (props) => {
    navigate("/edit/" + props + "");
  };
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    fetch("https://js-course-server.onrender.com/quotes/get-all-quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="all-quotes">
      <center>
        <button
          className="add-quote"
          onClick={() => {
            AddQuote();
          }}
        >
          Add Qoute
        </button>
        <button
          className="favorites"
          onClick={() => {
            localStorage.setItem("favorites_state", JSON.stringify(quoteState));
            navigate("/favorites");
          }}
        >
          Favorites
        </button>
        <h1>Favorites: {quoteState.favorites.length}</h1>
      </center>
      <div className="div">
        {quotes.map((item, index) => {
          return (
            <div className="card" key={index}>
              <h1>{item.quoteAuthor}</h1>
              <p>{item.quoteText}</p>
              <div className="goto">
                <button
                  onClick={() => {
                    console.log(item._id);
                    details(item._id);
                  }}
                >
                  Go to details
                </button>
                <button
                  onClick={() => {
                    console.log(item._id);
                    edit(item._id);
                  }}
                >
                  Edit quote
                </button>
                <button
                  onClick={() => {
                    deleteQuote(item._id);
                  }}
                >
                  Delete quote
                </button>
                <button
                  onClick={() => {
                    dispach(quoteSlice.actions.setFavorite(item));
                  }}
                >
                  Add to favorites
                </button>
                <button
                  onClick={() => {
                    console.log(quoteState);
                  }}
                >
                  console log state
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllQuotes;
