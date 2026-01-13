const Society = (() => {
  let happiness = 60;
  let faith = 50;

  function update(playerState, crime, politics, atmosphere){
    let newH = 50 + (playerState.gold-500)*0.1 - crime.heat*0.5 - politics.taxRate*0.3;
    Object.values(playerState.inventar).forEach(v=> newH+=v*0.05);
    happiness = Math.min(100, Math.max(0, newH));
    if(happiness<30) UI.showOverlay("Aufstand droht! Bevölkerung unruhig!");
    document.getElementById("soc-happiness").textContent=Math.round(happiness);
  }

  return {update,happiness,faith};
})();
