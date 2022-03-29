import { AiOutlineTwitter } from "react-icons/ai";
import { useSpring, animated } from "react-spring";
import { useState, useEffect, useRef } from "react";

const QuoteCard = ({ quote, author, fetchQuote, colorList }) => {
  // --------- HOOKS

  // -- useState
  const [heightList, changeHeightList] = useState([]);

  const [currentColor, changeCurrentColor] = useState(colorList[0]);

  // -- useRef

  const myRef = useRef();

  // -- useEffect

  useEffect(() => {
    // --- Get the current height of the p element
    const currentHeight = myRef.current.clientHeight;
    const heightListCopy = [...heightList];

    const colorListCopy = [...colorList];
    colorListCopy.filter((color) => color !== currentColor);

    const colorId = Math.floor(Math.random() * colorListCopy.length);

    changeCurrentColor(colorListCopy[colorId]);

    heightListCopy.push(currentHeight);
    changeHeightList(heightListCopy);
  }, [quote]);

  // -- React Spring

  const previousHeight = heightList[heightList.length - 2] + 200;
  const currentHeight = heightList[heightList.length - 1] + 200;

  console.log(previousHeight, currentHeight);

  const styles = useSpring({
    config: { duration: 500 },
    native: true,
    to: { height: `${currentHeight}px`, backgroundColor: currentColor },
    from: {
      height:
        heightList.length > 1 ? `${previousHeight}px` : `${currentHeight}px`,
    },
    reset: true,
  });

  return (
    <animated.div
      id="quote-box"
      style={{
        textAlign: "center",
        alignSelf: "center",
        padding: "30px",
        backgroundColor: "#009FB7",
        width: "500px",
        color: "white",
        ...styles,
      }}
    >
      <p ref={myRef} id="text">
        {quote}
      </p>
      <p id="author">- {author}</p>
      <div id="control">
        <button onClick={fetchQuote} id="new-quote">
          New quote
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${quote}`}
          target="_blank"
          id="tweet-quote"
        >
          <AiOutlineTwitter size={35} />
        </a>
      </div>
    </animated.div>
  );
};

export default QuoteCard;
