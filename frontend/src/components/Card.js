import { useEffect, useState } from "react";
import "./Card.css";
const Card = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [text, setText] = useState([
    "Cat card 😼",
    "Defuse card 🙅‍♂️",
    " Shuffle card 🔀",
    "Bomb card 💣",
  ]);
  const [cardno, setcardno] = useState(1);

  const handleCardFlip = () => {
    if (!isFlipped && props.start) {
      setIsFlipped(!isFlipped);
      props.cardclick(cardno);
    }
  };

  useEffect(() => {
    const randomNumber = Math.round(Math.random() * 3) + 1;
    setcardno(randomNumber);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (props.activecard === "Shuffle Card") {
        setIsFlipped(false);
        const randomNumber = Math.round(Math.random() * 3) + 1;
        setcardno(randomNumber);
      } else if (props.activecard === "Bomb Card") {
        if (props.defuse === 0) {
          setIsFlipped(false);
          const randomNumber = Math.round(Math.random() * 3) + 1;
          setcardno(randomNumber);
        }
      }
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [props.activecard]);

  useEffect(() => {
    if (props.own === true) {
      setIsFlipped(false);
      const randomNumber = Math.round(Math.random() * 3) + 1;
      setcardno(randomNumber);
    }
  }, [props.own]);

  return (
    <div
      className={`cursor-pointer  w-full mx-0 my-2 ${props.cardcolor} parent rounded-md shadow-md`}
      onClick={handleCardFlip}
    >
      <div
        className={`card w-full bg-base-100 rounded-md card2 shadow-xl cursor-pointer  ${
          isFlipped ? "flipped" : "notfliped"
        } `}
      >
        <figure className="h-16 sm:h-20 md:h-32 lg:h-52 bg-white">
          <img
            src={require(`../assets/image${cardno}.png`)}
            alt="img"
            className="rounded-t-md bg-white "
          />
        </figure>
        <div className="card-body items-center text-center min-h-32 ">
          <h2 className="card-title ">{text[cardno - 1]}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
