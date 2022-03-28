import {AiOutlineTwitter} from 'react-icons/ai'
import {useSpring, animated} from 'react-spring';
import { useState, useEffect, useRef } from 'react';
import Auto from '../auto.js';

const QuoteCard = ({quote, author, fetchQuote, height}) => {

  

    // --------- HOOKS


  // -- useEffect

  const [heightList, changeHeightList] = useState([]);

  // -- useRef 

  const myRef = useRef();

  // -- useEffect 

  useEffect(()=>{

    // --- Get the current height of the p element
    const currentHeight = myRef.current.clientHeight;



    const heightListCopy = [...heightList];

    heightListCopy.push(currentHeight);

    changeHeightList(heightListCopy);

    console.log("heightList is: " + heightList);

    console.log("Current height is: "+currentHeight);

  }
  ,[quote])


  // -- React Spring 

    const previousHeight = heightList[heightList.length-2]+200;
    const currentHeight = heightList[heightList.length-1]+200;

    console.log(previousHeight, currentHeight);

    const styles = useSpring({

      config: { duration: 500 },
      native: true,
      to : { height:`${currentHeight}px`, backgroundColor: 'green'},
      from: {height: heightList.length>1 ? `${previousHeight}px` : `${currentHeight}px`, backgroundColor: 'red'},
      reset: true,
        })
    

  
      

  return (
  <animated.div id="quote-box" style={{
    textAlign: 'center',
    alignSelf: 'center',
    padding: '30px',
    backgroundColor: '#009FB7',
    width: '500px',
    color: 'white',
    ...styles
      }}>
      <p ref={myRef} id="text">{quote}</p>
      <p id="author">- {author}</p>
      <div id="control">
          <button onClick={fetchQuote} id="new-quote">New quote</button>
          <a href="twitter.com/intent/tweet" target="_blank" id="tweet-quote"><AiOutlineTwitter size={35} /></a>
      </div>
  </animated.div>

    );
};

export default QuoteCard;
