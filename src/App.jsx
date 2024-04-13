import styled, { StyleSheetManager } from "styled-components";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { getTime } from "./getTime";
import { randomZone } from "../randomTimeZone";
import { timezones } from "./timezones";
import { shouldForwardProp } from "./forwardProp";

function App() {
  const [time, setTime] = useState(getTime());
  const [onTimezone, setOnTimezone] = useState(() => randomZone(timezones));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime(onTimezone));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [onTimezone]);

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <Clock
          data-tooltip-id="my-tooltip"
          data-tooltip-content={time.date.toLocaleString()}
        >
          <SecondsHandler secondsdeg={time.secondsdeg} />
          <MinutsHandler minutesdeg={time.minutesdeg} />
          <HoursHandler hoursdeg={time.hoursdeg} />
        </Clock>
      </StyleSheetManager>
      <div>
        <select onChange={(e) => setOnTimezone(e.target.value)} name="" id="">
          {onTimezone && <option>{onTimezone}</option>}
          {timezones.map((tz, idx) => {
            return (
              <option key={tz + idx} value={tz}>
                {tz}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default App;

const Clock = styled.div`
  height: 25px;
  width: 25px;
  border: 1px solid rgba(128, 128, 128, 0.7);
  border-radius: 100%;
  position: relative;
`;

const SecondsHandler = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${props.secondsdeg}deg)`,
  },
}))`
  position: absolute;
  background-color: gray;
  height: 10.5px;
  width: 0.5px;
  left: 50%;
  transform-origin: 0 100%;
  bottom: 50%;
`;

const MinutsHandler = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${props.minutesdeg}deg)`,
  },
}))`
  position: absolute;
  background-color: gray;
  height: 10px;
  width: 1px;
  left: 50%;
  border-radius: 1.5px;
  transform-origin: 0 100%;
  bottom: 50%;
`;

const HoursHandler = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${props.hoursdeg}deg)`,
  },
}))`
  position: absolute;
  background-color: gray;
  height: 8px;
  width: 1px;
  border-radius: 1.5px;
  left: 50%;
  transform-origin: 0 100%;
  bottom: 50%;
`;
