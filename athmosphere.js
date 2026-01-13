const Atmosphere = (() => {
  let hour=8;
  let weather="klar";
  let season="Frühling";

  function advanceDay(){
    hour=8;
    // Zufälliges Wetter
    const w=["klar","regen","schnee","sturm"];
    weather=w[Math.floor(Math.random()*w.length)];
    // Jahreszeitwechsel
    const s=["Frühling","Sommer","Herbst","Winter"];
    season=s[Math.floor(Math.random()*s.length)];
    document.getElementById("atm-weather").textContent=weather;
    document.getElementById("atm-season").textContent=season;
    document.getElementById("atm-time").textContent=hour;
  }

  return {advanceDay, weather, season};
})();
