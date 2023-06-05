import React from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AllQuotes/AllQuotes";

function EditQuote() {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const [quote, SetQuote] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  let Done = () => {
    const newData = {
      quoteText: text,
      quoteAuthor: author,
      quoteSource: quote.quoteSource,
    };
    fetch("https://js-course-server.onrender.com/quotes/edit/" + params.id, {
      method: "PATCH",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
        // authorization:
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjYzZDQyMTM5OWZhZjUyMDAzNDFmYzE1NSIsImZ1bGxOYW1lIjoiVGVzdCIsImlzQWRtaW4iOmZhbHNlLCJpc0d1ZXN0IjpmYWxzZSwiaWF0IjoxNjg1OTg3NjM0LCJleHAiOjE3MTc1MjM2MzR9.oiaPjkSZC3YE9mIzguobRvD89233KTyaknavqDbn85A",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Uspesno ste editovali citat");
        navigate("/");
      })
      .catch(() => {
        alert("nesto nije u redu");
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

        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getQuotes();
  }, []);
  return (
    <div className="all-quotes">
      <div className="card">
        <h1>Edit quote</h1>
        <div className="edit">
          <div>
            <p>QuoteAuthor:</p>
            <input
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div>
            <p>QuoteText:</p>
            <input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        </div>
        <center>
          <button
            onClick={() => {
              Done();
            }}
          >
            Done
          </button>
        </center>
      </div>
    </div>
  );
}

export default EditQuote;
