import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes/AllQuotes";
import QuoteDetails from "./pages/QuoteDetails/QuoteDetails";
import EditQuote from "./pages/EditQuote/EditQuote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllQuotes />} />
        <Route path="/quote/:id" element={<QuoteDetails />} />
        <Route path="/edit/:id" element={<EditQuote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
