const Economy = (() => {
  const markt = {
    korn:      { preis: 10, menge: 100, nachfrage: 100, qualität: 1, region: "Süden" },
    holz:      { preis: 20, menge: 80, nachfrage: 80, qualität: 1, region: "Norden" },
    eisen:     { preis: 40, menge: 50, nachfrage: 60, qualität: 1, region: "Osten" },
    wein:      { preis: 30, menge: 40, nachfrage: 50, qualität: 1, region: "Süden" },
    gewürze:   { preis: 60, menge: 20, nachfrage: 30, qualität: 1, region: "Osten" },
    stoffe:    { preis: 25, menge: 50, nachfrage: 60, qualität: 1, region: "Norden" }
  };

  let inflation = 1.0;
  let kreditZins = 0.05;
  let schwarzmarkt = { aktiv: false, aufschlag: 1.8 };

  function updatePreise() {
    for (let ware in markt) {
      const m = markt[ware];
      const druck = (m.nachfrage - m.menge) * 0.05;
      const volatilität = (Math.random()-0.5) * 0.5;
      m.preis = Math.max(1, (m.preis + druck + volatilität) * inflation);
    }
  }

  function zufallsEvent() {
    if(Math.random()<0.25) {
      const events = ["ernten","brand","krieg","inflation","schwarzmarkt"];
      return events[Math.floor(Math.random()*events.length)];
    }
    return null;
  }

  function wendeEvent(anEvent) {
    switch(anEvent) {
      case "ernten": markt.korn.menge += 30; break;
      case "brand":  markt.holz.menge -= 20; break;
      case "krieg":  markt.eisen.nachfrage += 25; break;
      case "inflation": inflation = Math.min(1.5, inflation + 0.05); break;
      case "schwarzmarkt": schwarzmarkt.aktiv = true; break;
    }
  }

  function kreditAufnehmen(state, betrag) {
    state.gold += betrag;
    state.schulden = (state.schulden||0) + betrag*(1+kreditZins);
  }

  function kreditZurueckzahlen(state, betrag) {
    if(!state.schulden) return;
    const zahle = Math.min(betrag, state.schulden);
    if(state.gold >= zahle) {
      state.gold -= zahle;
      state.schulden -= zahle;
    }
  }

  function getPreis(ware) {
    let p = markt[ware].preis;
    if(schwarzmarkt.aktiv) p *= schwarzmarkt.aufschlag;
    return p;
  }

  return { markt, updatePreise, zufallsEvent, wendeEvent, kreditAufnehmen, kreditZurueckzahlen, getPreis };
})();
