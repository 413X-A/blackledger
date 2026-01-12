const Game = (() => {
  const state = {
    tag: 1,
    gold: 500,
    schulden: 0,
    reputation: 50,
    inventar: { korn:0, holz:0, eisen:0, wein:0, gewuerze:0, stoffe:0 },
    // Flags für später: Endgame, Forschung etc.
    flags: { endgameUnlocked:false }
  };

  // Nächster Tag
  function naechsterTag(){
    state.tag++;

    // Preise aktualisieren
    Economy.updatePreise();

    // Zufallsevent
    const evt = Economy.zufallsEvent();
    if(evt){
      Economy.wendeEvent(evt);
      let msg = "";
      switch(evt){
        case "ernten": msg = "Gute Nachricht: Eine reiche Ernte hat den Kornpreis gesenkt!"; break;
        case "brand": msg = "Schlechte Nachricht: Ein Brand hat Teile des Holzbestands zerstört!"; break;
        case "krieg": msg = "Alarm: Ein Krieg hat die Nachfrage nach Eisen erhöht!"; break;
        case "inflation": msg = "Warnung: Inflation treibt die Preise in die Höhe!"; break;
        case "schwarzmarkt": msg = "Geheim: Der Schwarzmarkt ist jetzt aktiv!"; break;
      }
      UI.showOverlay(msg);
    }

    // KI-Runde
    const aiMsg = AI.runde(Economy.markt, state);
    if(aiMsg) UI.showOverlay(aiMsg);

    // Gesellschaftliche Events
    if(state.reputation<30 && Math.random()<0.5){
      UI.showOverlay("Aufstand in der Bevölkerung! Du musst handeln oder die Zufriedenheit sinkt weiter!");
    }

    // UI aktualisieren
    UI.update(state);
  }

  // Kaufen
  function kaufen(ware){
    const preis = Economy.getPreis(ware);
    if(state.gold>=preis){
      state.gold-=preis;
      state.inventar[ware]++;
      UI.log(`Du hast 1 ${ware} gekauft für ${preis.toFixed(1)} Gold.`);
      UI.update(state);
    } else {
      UI.showOverlay("Nicht genug Gold, um diese Ware zu kaufen!");
    }
  }

  // Verkaufen
  function verkaufen(ware){
    if(state.inventar[ware]>0){
      const preis = Economy.getPreis(ware);
      state.inventar[ware]--;
      state.gold+=preis;
      UI.log(`Du hast 1 ${ware} verkauft für ${preis.toFixed(1)} Gold.`);
      UI.update(state);
    } else {
      UI.showOverlay("Keine Ware im Lager, um zu verkaufen!");
    }
  }

  // Game starten
  function init(){
    document.getElementById("nextDayBtn").addEventListener("click", naechsterTag);
    UI.update(state);
  }

  return {state,naechsterTag,kaufen,verkaufen,init};
})();

window.addEventListener("load", Game.init);
