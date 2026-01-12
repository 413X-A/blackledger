const Atmosphere = (() => {
  let time = 0; // 0..24
  let weather = "Clear";

  function tick() {
    time = (time + 1) % 24;
    if (Math.random() < 0.1) {
      const w = ["Clear","Rain","Storm","Fog"];
      weather = w[Math.floor(Math.random()*w.length)];
      console.log("Weather:", weather);
    }
  }

  function isNight() { return time >= 20 || time < 6; }

  return { tick, isNight, get weather(){return weather;} };
})();
