const Society = (() => {
  let happiness = 60;
  let faith = 50;

  function update(playerState, crime, politics, atmosphere){
    happiness = 50 + (playerState.gold-500)*0.01 - crime.heat*0.2 - politics.taxRate*0.3;

    // Jahreszeitliche Wirkung
    const season = atmosphere.getSeason();
    if(season==="Winter"){
      // Winter → Versorgung knapp, Bevölkerung unzufriedener
      Object.values(playerState.inventar).forEach(v=>happiness += v*0.05);
      happiness -= 5;
    }

    if(atmosphere.weather==="sturm") happiness -= 5;
    if(atmosphere.time<6 || atmosphere.time>20) happiness -= 2;

    if(happiness<25) UI.showOverlay("Aufstand droht! Bevölkerung unruhig!");
    happiness = Math.min(100, Math.max(0, happiness));
    document.getElementById("soc-happiness").textContent = Math.round(happiness);
  }

  return {update,happiness,faith};
})();
