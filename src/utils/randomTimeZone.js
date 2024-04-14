export const randomZone = (timezones) => {
  const idx = Math.floor(Math.random() * timezones.length);
  return timezones[idx];
};
