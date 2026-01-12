const Economy = (() => {
  const markt = {
    korn:{preis:10,menge:100,nachfrage:100,region:"Süden",season:"Sommer"},
    holz:{preis:20,menge:80,nachfrage:80,region:"Norden",season:"Herbst"},
    eisen:{preis:40,menge:50,nachfrage:60,region:"Osten",season:"Frühling"},
    wein:{preis:30,menge:40,nachfrage:50,region:"Süden",season:"Herbst"},
    gewuerze:{preis:60,menge:20,nachfrage:30,region:"Osten",season:"Sommer"},
    stoffe:{preis:25,menge:50,nachfrage:60,region:"Norden",season:"Frühling"}
  };
  let inflation = 1.0;
  let schwarzmarkt = {aktiv:false,aufschlag:1.8};

  function updatePreise(atmosphere, society){
    const currentSeason = atmosphere.getSeason();
    for(let w in markt){
      const m = markt[w];
      const diff = m.nachfrage - m.menge;

      // Saisonale Menge
      let saisonFaktor = (m.season===currentSeason)?1.3:0.8;
      // Wetter + Inflation
      let wetterFaktor = (atmosphere.weather==="sturm"?1.2:1.0);
      m.preis = Math.max(1, (m.preis + diff*0.05)*saisonFaktor*wetterFaktor*inflation);
      // Menge leicht variieren
      m.menge = Math.max(0, m.menge * (0.95 + Math.random()*0.1));
    }
  }

  function getPreis(ware){
    let p = markt[ware].preis;
    if(schwarzmarkt.aktiv) p *= schwarzmarkt.aufschlag;
    return p;
  }

  return {markt,updatePreise,getPreis};
})();
