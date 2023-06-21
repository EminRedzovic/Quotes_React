import React from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AllQuotes/AllQuotes";

function QuoteDetails() {
  const params = useParams();
  console.log(params);
  const [quote, SetQuote] = useState([]);
  const [isLoading, SetIsLoading] = useState([true]);
  let getQuotes = () => {
    fetch(
      "https://js-course-server.onrender.com/quotes/get-quote/" + params.id + ""
    )
      .then((res) => res.json())
      .then((data) => {
        SetQuote(data);
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
      <div className="card">
        <p>
          Quote Author: <span>{quote.quoteAuthor}</span>{" "}
        </p>
        <p>
          Quote Text: <span>{quote.quoteText}</span>
        </p>
        <p>
          Quote Source: <span>{quote.quoteSource}</span>
        </p>
        <p>
          Likes: <span>{quote.likes}</span>
        </p>
        <div className="like-button">
          <button
            onClick={() => {
              fetch(
                "https://js-course-server.onrender.com/quotes/like/" +
                  params.id +
                  "",
                {
                  method: "PATCH",
                  headers: {
                    Authorization:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjYzZDQyMTM5OWZhZjUyMDAzNDFmYzE1NSIsImZ1bGxOYW1lIjoiVGVzdCIsImlzQWRtaW4iOmZhbHNlLCJpc0d1ZXN0IjpmYWxzZSwiaWF0IjoxNjg1OTg3NjM0LCJleHAiOjE3MTc1MjM2MzR9.oiaPjkSZC3YE9mIzguobRvD89233KTyaknavqDbn85A",
                  },
                }
              )
                .then((response) => {
                  getQuotes();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteDetails;
