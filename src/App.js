import logo from './logo.svg';
import './App.css';
import QuoteCard from './Components/QuoteCard';
import {useEffect, useState} from 'react';

function App() {

  const [currentQuote, updateQuote] = useState("")
  const [currentAuthor, updateAuthor] = useState("")
  const [cardHeight, changeHeight] = useState([80,120])

  const fetchQuote = async () =>{
    try{


      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      const data = await response.json();
      const quotes = data.quotes;

      const quoteIndex = Math.floor(Math.random() * quotes.length);

      

      console.log(quotes);

      updateQuote(quotes[quoteIndex].quote);
      updateAuthor(quotes[quoteIndex].author)
      console.log(currentQuote + " " + currentAuthor);


    } catch(error){
      console.log("an error has occured: " + error);
    }

  }

  // provides the initial quote on each load
  useEffect(()=>{

    fetchQuote();

    //const textHeight = document.getElementById('text').offsetHeight;
    //console.log("TextHeight is:  " + textHeight);

    

  },
[]);

  return (
    <div className="App">   
      <QuoteCard  height={cardHeight} fetchQuote={fetchQuote} quote={currentQuote} author={currentAuthor}/>
    </div>
  );
}

export default App;
