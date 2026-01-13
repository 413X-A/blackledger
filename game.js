const Game = (() => {
  const state = {
    tag:1,
    gold:500,
    schulden:0,
    reputation:50,
    inventar:{korn:0,holz:0,eisen:0,wein:0,gewuerze:0,stoffe:0}
  };

  function kaufen(w){
    const p=Economy.getPreis(w);
    if(state.gold>=p){
      state.gold-=p;
      state.inventar[w]++;
      UI.log(`Du kaufst 1 ${w} für ${p} Gold`);
      tick();
    } else UI.log("Nicht genug Gold!");
  }

  function verkaufen(w){
    if(state.inventar[w]>0){
      const p=Economy.getPreis(w);
      state.inventar[w]--;
      state.gold+=p;
      UI.log(`Du verkaufst 1 ${w} für ${p} Gold`);
      tick();
    } else UI.log(`Keine ${w} zum verkaufen!`);
  }

  function tick(){
    // Markt aktualisieren
    Economy.updatePreise(state, AI.rivals, Society, Atmosphere);
    // KI-Aktionen
    AI.entscheidung(state, Atmosphere, Crime, Politics, Society);
    // Bevölkerung aktualisieren
    Society.update(state, Crime, Politics, Atmosphere);
    // Overlay & UI
    UI.update(state);
  }

  function nextDay(){
    state.tag++;
    Atmosphere.advanceDay();
    tick();
    UI.log(`Tag ${state.tag} beginnt`);
  }

  return {state,kaufen,verkaufen,nextDay};
})();

document.getElementById("nextDayBtn").addEventListener("click", ()=>Game.nextDay());
