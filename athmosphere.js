const Atmosphere = (() => {
  let time = 8; // 0-23 Stunden
  let weather = "klar";

  function naechsteStunde(){
    time++;
    if(time>23) time=0;
    document.getElementById("atm-time").textContent = time;
    // Wetter zufällig ändern
    if(Math.random()<0.1){
      const options=["klar","regen","sturm"];
      weather = options[Math.floor(Math.random()*options.length)];
      document.getElementById("atm-weather").textContent = weather;
      UI.showOverlay(`Wetteränderung: ${weather}`);
    }
  }

  return {time,weather,naechsteStunde};
})();
