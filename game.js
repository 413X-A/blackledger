const Game = (() => {
  const state = {tag:1, gold:500, schulden:0, reputation:50, inventar:{korn:0,holz:0,eisen:0,wein:0,gewuerze:0,stoffe:0}};

  function naechsterTag(){
    state.tag++;
    document.getElementById("ui-day").textContent = state.tag;

    Atmosphere.naechsteStunde();
    Economy.updatePreise(Atmosphere, Society);
    AI.runAll(state, Atmosphere, Crime, Politics, Society);
    Society.update(state, Crime, Politics, Atmosphere);
    UI.update(state);
  }

  function kaufen(ware){
    const preis = Economy.getPreis(ware);
    if(state.gold>=preis){
      state.gold -= preis;
      state.inventar[ware]++;
      UI.log(`Du hast 1 ${ware} gekauft für ${preis.toFixed(1)} Gold.`);
      UI.update(state);
    } else UI.showOverlay("Nicht genug Gold!");
  }

  function verkaufen(ware){
    if(state.inventar[ware]>0){
      const preis = Economy.getPreis(ware);
      state.inventar[ware]--;
      state.gold += preis;
      UI.log(`Du hast 1 ${ware} verkauft für ${preis.toFixed(1)} Gold.`);
      UI.update(state);
    } else UI.showOverlay("Keine Ware im Lager!");
  }

  function init(){
    document.getElementById("nextDayBtn").addEventListener("click", naechsterTag);
    document.querySelectorAll(".buy").forEach(btn=>{
      const ware = btn.closest(".good").dataset.id;
      btn.addEventListener("click",()=>kaufen(ware));
    });
    document.querySelectorAll(".sell").forEach(btn=>{
      const ware = btn.closest(".good").dataset.id;
      btn.addEventListener("click",()=>verkaufen(ware));
    });
    UI.update(state);
  }

  return {state,naechsterTag,kaufen,verkaufen,init};
})();
window.addEventListener("load", Game.init);
