import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Favorites() {
  const quoteState = useSelector((state) => state.quote);
  const [quote, SetQuote] = useState([]);
  let token = JSON.parse(localStorage.getItem("favorites_state"));
  token = token.favorites;

  // useEffect(() => {
  //   for (let i = 0; i <= token.length - 1; i++) {
  //     fetch(
  //       "https://js-course-server.onrender.com/quotes/get-quote/" + token[i]._id
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(quote);
  //         const data1 = [...quote];
  //         data1.push(data);
  //         SetQuote(data1);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);
  return (
    <div
      className="favorites-div"
      onClick={() => {
        console.log(token);
      }}
    >
      {token.map((item) => {
        return (
          <div className="card">
            <p>
              Quote Author: <span>{item.quoteAuthor}</span>{" "}
            </p>
            <p>
              Quote Text: <span>{item.quoteText}</span>
            </p>
            <p>
              Quote Source: <span>{item.quoteSource}</span>
            </p>
            <p>
              Likes: <span>{item.likes}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
