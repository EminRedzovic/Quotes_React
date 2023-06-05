import React, { useEffect } from "react";
import "./AllQuotes.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AllQuotes() {
  const navigate = useNavigate();
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
      });
  }, []);
  return (
    <div className="all-quotes">
      <div>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllQuotes;
