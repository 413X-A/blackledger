const Atmosphere = (() => {
  let time = 8; // 0-23 Stunden
  let weather = "klar";
  let seasonIndex = 0;
  const seasons = ["Frühling","Sommer","Herbst","Winter"];
  let seasonDay = 0;

  function naechsteStunde(){
    time++;
    if(time>23){
      time=0;
      naechsterTag();
    }
    document.getElementById("atm-time").textContent = time;

    // Wetter zufällig
    if(Math.random()<0.1){
      const options=["klar","regen","sturm"];
      weather = options[Math.floor(Math.random()*options.length)];
      document.getElementById("atm-weather").textContent = weather;
      UI.showOverlay(`Wetteränderung: ${weather}`);
    }
  }

  function naechsterTag(){
    seasonDay++;
    if(seasonDay>30){ // jede Saison 30 Tage
      seasonDay=1;
      seasonIndex = (seasonIndex+1)%4;
      UI.showOverlay(`Neue Jahreszeit: ${seasons[seasonIndex]}`);
      document.getElementById("atm-season").textContent = seasons[seasonIndex];
    }
  }

  function getSeason(){
    return seasons[seasonIndex];
  }

  return {time,weather,getSeason,naechsterTag,naechsteStunde,seasons,seasonIndex,seasonDay};
})();
