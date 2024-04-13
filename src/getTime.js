export function getTime(timezone) {
  const timeInterval = 6;
  const hourInterval = 30;
  const now = new Date().toLocaleString("en-US", { timeZone: timezone });
  const date = new Date(now);
  const [seconds, minutes, hours] = [
    date.getSeconds(),
    date.getMinutes(),
    date.getHours(),
  ];

  const [secondsdeg, minutesdeg, hoursdeg] = [
    seconds * timeInterval,
    minutes * timeInterval + seconds / 10,
    hours * hourInterval + minutes / 2,
  ];

  return { secondsdeg, minutesdeg, hoursdeg, date };
}
