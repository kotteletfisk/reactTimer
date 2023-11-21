import { useState, useEffect, useRef } from "react";

function Timer() {
  const [initTime, setInitTime] = useState(0); // 10 minutes
  const [time, setTime] = useState(initTime); // 10 minutes
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  useEffect(() => {
    let intervalID;

    const handleTimeUp = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      alert("Time is up!");
      setIsActive(false);
    };

    if (isActive) {
      intervalID = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      if (time < 1) {
        handleTimeUp;
      }
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [isActive, time]);

  function updateTime(time) {
    setTime(time * 60);
    setInitTime(time * 60);
    setIsActive(false);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    event.target.id === "inputMinutes" && setInputMinutes(value);
    event.target.id === "inputSeconds" && setInputSeconds(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const parsedMinutes =
      isNaN(inputMinutes) || inputMinutes === "" ? 0 : parseInt(inputMinutes);
    const parsedSeconds =
      isNaN(inputSeconds) || inputSeconds === "" ? 0 : parseInt(inputSeconds);
    const inputTime = parsedMinutes * 60 + parsedSeconds;
    updateTime(inputTime / 60);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //    TODO: make reset, add init value
  return (
    <div className="timer">
      <Clock seconds={seconds} minutes={minutes} />
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={() => updateTime(initTime / 60)}>Reset</button>
      <br />
      {<button onClick={() => updateTime(5)}>5 Min</button>}
      <button onClick={() => updateTime(10)}>10 Min</button>
      <button onClick={() => updateTime(15)}>15 Min</button>
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="inputMinutes">
                  Set minutes:
                  <br />
                  <input
                    id="inputMinutes"
                    type="number"
                    min={0}
                    value={inputMinutes}
                    onChange={handleInputChange}
                  />
                </label>
              </td>
              <td>
                <label htmlFor="inputSeconds">
                  Set seconds:
                  <br />
                  <input
                    id="inputSeconds"
                    type="number"
                    min={0}
                    value={inputSeconds}
                    onChange={handleInputChange}
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button type="submit">Set</button>
      </form>
      {/* <audio controls ref={audioRef}>
        <source src="/assets/alarm.wav" type="audio/wav" />
      </audio> */}
    </div>
  );
}

function Clock({ minutes, seconds }) {
  return (
    <div className="clock">
      <h1>
        {minutes} : {seconds}
      </h1>
    </div>
  );
}

export default Timer;
