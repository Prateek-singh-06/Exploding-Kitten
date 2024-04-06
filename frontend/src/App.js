import "./App.css";
import Card from "./components/Card";
import Split from "react-split";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useRef, useState } from "react";
function App() {
  const [start, setStart] = useState(0);
  const [defuse, setDefuse] = useState(0);
  const [flippedcount, setFlippedcount] = useState(0);
  const [activecard, setactivecard] = useState("");
  const [username, setusername] = useState([]);
  const [own, setown] = useState(false);
  const socketRef = useRef(null);
  const sendRef = useRef(null);
  const [yourname, setyourname] = useState({ name: "", score: 0 });
  console.log(username);
  // const [score, setscore] = useState();

  //lost, setown condition and suffle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activecard === "Shuffle Card") {
        setDefuse(0);
        setFlippedcount(0);
        setactivecard("");
      } else if (activecard === "Bomb Card") {
        if (defuse === 0) {
          setFlippedcount(0);
          setactivecard("");
          setStart(0);
          // setown(false);
          const answer = window.confirm(
            "You lost the game! do you want to play again?"
          );

          if (answer) {
            setStart(1);
          } else {
            setStart(0);
          }
        } else {
          setDefuse(defuse - 1);
          if (flippedcount === 5) {
            setown(true);
          }
        }
      } else {
        if (flippedcount === 5) {
          setown(true);
        }
      }
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [flippedcount]);

  useEffect(() => {
    socketRef.current = new WebSocket(`${process.env.REACT_APP_URL}/echo`);
    socketRef.current.onopen = () => {
      console.log("connected");
      sendRef.current = (message) => {
        socketRef.current.send(JSON.stringify(message));
      };
      sendRef.current(1);
    };

    socketRef.current.onmessage = (e) => {
      // console.log(JSON.parse(e.data));
      setusername(JSON.parse(e.data));
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  //own condition
  useEffect(() => {
    if (own === true) {
      setDefuse(0);
      setFlippedcount(0);
      setactivecard("");
      setStart(0);
      setown(false);
      const answer = window.confirm(
        "You own the game! do you want to play again?"
      );
      if (answer) {
        setStart(1);
      } else {
        setStart(0);
      }
      setyourname((pre) => {
        return {
          ...pre,
          score: pre.score + 1,
        };
      });

      const newUsers = username.map((user) =>
        user.name === yourname.name ? { ...user, score: yourname.score } : user
      );
      setusername(newUsers);
      sendRef.current(1);
    }
  }, [own]);

  useEffect(() => {
    if (yourname.name != "") {
      sendRef.current(yourname);
    }
  }, [yourname]);
  const handlestart = () => {
    const answer = window.prompt("What is your username");
    if (answer !== null) {
      setStart(1);
      setyourname({ name: answer, score: 0 });

      // Add the new object to the array
      setusername((prevData) => [...prevData, { name: answer, score: 0 }]);
    }
    console.log(username);

    // if (socketRef.current) {
    //   socketRef.current.send({ username: answer, score: 0 });
    // }
  };

  //function for card click
  const cardclick = (value) => {
    const cardType =
      value === 2
        ? "Defuse Card"
        : value === 1
        ? "Cat Card"
        : value === 3
        ? "Shuffle Card"
        : "Bomb Card";
    setactivecard(cardType);
    if (value === 2) {
      setDefuse(defuse + 1);
    }
    setFlippedcount(flippedcount + 1);
  };

  return (
    <div className="App min-h-screen bg-black overflow-hidden">
      <Split sizes={[75, 25]} direction="horizontal" className="flex">
        <div className="">
          <div className="grid grid-cols-5 gap-4 ml-5 mt-5">
            <Card
              cardimg={1}
              start={start}
              cardclick={cardclick}
              activecard={activecard}
              defuse={defuse}
              own={own}
              cardcolor="blue"
            />
            <Card
              cardimg={2}
              start={start}
              cardclick={cardclick}
              activecard={activecard}
              defuse={defuse}
              own={own}
              cardcolor="red"
            />
            <Card
              cardimg={2}
              start={start}
              cardclick={cardclick}
              activecard={activecard}
              defuse={defuse}
              own={own}
              cardcolor="blue"
            />
            <Card
              cardimg={4}
              start={start}
              cardclick={cardclick}
              activecard={activecard}
              defuse={defuse}
              own={own}
              cardcolor="red"
            />
            <Card
              cardimg={1}
              start={start}
              cardclick={cardclick}
              activecard={activecard}
              defuse={defuse}
              own={own}
              cardcolor="blue"
            />
          </div>
          <div
            className={` bg-black border-4 rounded-md relative  h-80 items-center justify-center flex`}
          >
            <div
              className={`absolute top-1 right-3 text-2xl text-white ${
                flippedcount === 0 ? "hidden" : ""
              }`}
            >
              Your score is {yourname.score}
            </div>
            <button
              className={`btn btn-wide text-slate-100 ${
                start ? "hidden" : ""
              } `}
              onClick={handlestart}
            >
              Start
            </button>

            <div
              className={`text-4xl leading-tight  mb-4 font-bold text-white ${
                !start || flippedcount > 0 ? "hidden" : ""
              }`}
            >
              Click on any card
            </div>
            <div
              className={`text-4xl leading-tight flex w-full  mb-4 font-bold text-zinc-700 ${
                flippedcount === 0 ? "hidden" : ""
              }`}
            >
              <div className="w-1/2 text-white">
                {defuse}
                {<br />}Total Difuse Card
              </div>
              <div className="w-1/2 text-white">
                {activecard}
                {<br />}Active Card
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 bg-white ">
          <Leaderboard username={username} />
        </div>
      </Split>
    </div>
  );
}
export default App;
