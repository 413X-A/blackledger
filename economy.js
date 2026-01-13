const Economy = (() => {
  const markt = {
    korn: {preis:10, menge:50, nachfrage:50, season:"Sommer"},
    holz: {preis:20, menge:40, nachfrage:40, season:"Winter"},
    eisen: {preis:30, menge:20, nachfrage:30, season:"Herbst"},
    wein: {preis:25, menge:30, nachfrage:25, season:"Herbst"},
    gewuerze: {preis:50, menge:10, nachfrage:15, season:"Sommer"},
    stoffe: {preis:35, menge:15, nachfrage:20, season:"Frühling"}
  };

  function getPreis(w) { return markt[w].preis; }

  function updatePreise(playerState, rivals, society, atmosphere){
    for(let w in markt){
      let ware = markt[w];
      // Nachfrage beeinflusst durch Bevölkerung
      let nachfrage = ware.nachfrage + (society.happiness-50)*0.5;

      // Rivalen beeinflussen Markt
      rivals.forEach(r=>{
        if(r.inventar[w]) nachfrage += r.inventar[w]*0.8;
      });

      // Spieler beeinflusst direkt
      nachfrage += playerState.inventar[w]*0.5;

      // Saison und Wetter
      let saisonFaktor = (ware.season === atmosphere.getSeason())? 1.2 : 0.8;
      let wetterFaktor = (atmosphere.weather==="sturm")?1.3:1;

      let diff = nachfrage - ware.menge;
      ware.preis = Math.max(1, (ware.preis + diff*0.05)*saisonFaktor*wetterFaktor);
    }
  }

  return {markt,getPreis,updatePreise};
})();
