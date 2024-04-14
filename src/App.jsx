import styled, { StyleSheetManager } from "styled-components";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import { getTime } from "./utils/getTime";
import { randomZone } from "./utils/randomTimeZone";
import { timezones } from "./timezones";
import { shouldForwardProp } from "./utils/forwardProp";
import { Tooltip } from "react-tooltip";

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
        <Tooltip
          id="my-tooltip"
          offset={15}
          border={"1px solid rgba(168,162,158,0.5)"}
        />
      </StyleSheetManager>
      <div>
        <select
          onChange={(e) => setOnTimezone(e.target.value)}
          id="timezone-selector"
          value={onTimezone}
        >
          {timezones.map((tz, idx) => {
            return (
              <option id={`${tz}-option`} key={tz + idx} value={tz}>
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
  border: 1px solid rgba(168, 162, 158, 0.5);
  border-radius: 100%;
  position: relative;
`;

const SecondsHandler = styled.div.attrs((props) => ({
  style: {
    transform: `rotate(${props.secondsdeg}deg)`,
  },
}))`
  position: absolute;
  background-color: rgb(168, 162, 158);
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
  background-color: rgb(168, 162, 158);
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
  background-color: rgb(168, 162, 158);
  height: 8px;
  width: 1px;
  border-radius: 1.5px;
  left: 50%;
  transform-origin: 0 100%;
  bottom: 50%;
`;
