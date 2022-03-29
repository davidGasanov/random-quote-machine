import logo from "./logo.svg";
import "./App.css";
import QuoteCard from "./Components/QuoteCard";
import { useEffect, useState } from "react";

function App() {
  const colorList = [
    "#698996",
    "#407076",
    "#CE796B",
    "#C18C5D",
    "#06D6A0",
    "#048A81",
    "#8A89C0",
    "#0A2E36",
    "#14CC60",
    "#A49694",
    "#472836",
  ];

  // useState

  const [currentQuote, updateQuote] = useState("");
  const [currentAuthor, updateAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const data = await response.json();
      const quotes = data.quotes;

      const quoteIndex = Math.floor(Math.random() * quotes.length);

      console.log(quotes);

      updateQuote(quotes[quoteIndex].quote);
      updateAuthor(quotes[quoteIndex].author);
      console.log(currentQuote + " " + currentAuthor);
    } catch (error) {
      console.log("an error has occured: " + error);
    }
  };

  // provides the initial quote on each load
  useEffect(() => {
    fetchQuote();

    //const textHeight = document.getElementById('text').offsetHeight;
    //console.log("TextHeight is:  " + textHeight);
  }, []);

  return (
    <div className="App">
      <QuoteCard
        colorList={colorList}
        fetchQuote={fetchQuote}
        quote={currentQuote}
        author={currentAuthor}
      />
    </div>
  );
}

export default App;
