const Society = (() => {
  let happiness = 60;
  let faith = 50;

  function update(playerState, crime, politics, atmosphere){
    // Grundzufriedenheit
    happiness = 50 + (playerState.gold-500)*0.01 - crime.heat*0.2 - politics.taxRate*0.3;

    // Jahreszeit/Wetter
    if(atmosphere.weather==="sturm") happiness -= 5;
    if(atmosphere.time<6 || atmosphere.time>20) happiness -= 2;

    // KI Markt-Aktionen
    Object.values(AI.rivals).forEach(r=>{
      happiness -= r.inventar.eisen*0.1; // Beispiel: Konkurrenz kauft Eisen → Preise steigen → Bevölkerung unzufrieden
    });

    // Limits
    happiness = Math.min(100, Math.max(0, happiness));
    document.getElementById("soc-happiness").textContent = Math.round(happiness);

    // Overlay nur bei kritischen Werten
    if(happiness<25) UI.showOverlay("Aufstand droht! Bevölkerung unruhig!");
  }

  return {update,happiness,faith};
})();
