const Atmosphere = (() => {
  let time=8; // Stunde
  let weather="klar";
  let season="Frühling";

  function advanceDay(){
    time=8;
    const seasons=["Frühling","Sommer","Herbst","Winter"];
    season = seasons[(seasons.indexOf(season)+1)%4];
    weather=["klar","regen","sturm"][Math.floor(Math.random()*3)];
    document.getElementById("atm-time").textContent=time;
    document.getElementById("atm-weather").textContent=weather;
    document.getElementById("atm-season").textContent=season;
  }

  function getSeason(){return season;}

  return {time,weather,season,advanceDay,getSeason};
})();
