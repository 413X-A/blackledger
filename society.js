const Society = (() => {
  let happiness = 60;
  let faith = 50;

  function update(playerState){
    // Zufriedenheit sinkt bei wenig Gold
    if(playerState.gold < 50) happiness -= 2;
    if(happiness < 0) happiness = 0;
    if(happiness > 100) happiness = 100;

    // Religion beeinflusst Moral
    if(faith < 30 && Math.random() < 0.3){
      UI.showOverlay("Die Bevölkerung ist unruhig durch sinkenden Glauben!");
    }

    // Aufstände
    if(happiness < 30 && Math.random() < 0.3){
      UI.showOverlay("Aufstand in der Bevölkerung! Handle schnell!");
    }

    // UI aktualisieren
    document.getElementById("soc-happiness").textContent = happiness;
    document.getElementById("soc-faith").textContent = faith;
  }

  function adjustHappiness(amount){
    happiness += amount;
    if(happiness>100) happiness=100;
    if(happiness<0) happiness=0;
  }

  return {update,adjustHappiness,happiness,faith};
})();
