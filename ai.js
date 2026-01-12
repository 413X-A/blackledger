const AI = (() => {
  const state = {
    gold: 500,
    inventar: { korn:0, holz:0, eisen:0, wein:0, gewürze:0, stoffe:0 },
    stil: "Aggressiv",
    gedächtnis: { verraten: false }
  };

  function spionage(playerState) {
    if(Math.random()<0.2) return `Die Rivalen wissen jetzt, dass du ${playerState.gold} Gold hast!`;
    return null;
  }

  function runde(markt, playerState) {
    const waren = Object.keys(state.inventar);
    const w = waren[Math.floor(Math.random()*waren.length)];
    const preis = markt[w].preis;

    let msg = spionage(playerState);
    if(msg) return msg;

    if(Math.random()<0.6 && state.gold >= preis) {
      state.gold -= preis;
      state.inventar[w]++;
      markt[w].nachfrage += 2;
      return `Die Rivalen haben ${w} gekauft!`;
    } else if(state.inventar[w]>0) {
      state.inventar[w]--;
      state.gold += preis;
      markt[w].menge += 2;
      return `Die Rivalen haben ${w} verkauft!`;
    }
    return null;
  }

  return { state, runde };
})();
