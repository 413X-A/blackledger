const Economy = (() => {
  const markt = {
    korn:{preis:10,menge:100,nachfrage:100,region:"Süden"},
    holz:{preis:20,menge:80,nachfrage:80,region:"Norden"},
    eisen:{preis:40,menge:50,nachfrage:60,region:"Osten"},
    wein:{preis:30,menge:40,nachfrage:50,region:"Süden"},
    gewuerze:{preis:60,menge:20,nachfrage:30,region:"Osten"},
    stoffe:{preis:25,menge:50,nachfrage:60,region:"Norden"}
  };
  let inflation = 1.0;
  let schwarzmarkt = {aktiv:false,aufschlag:1.8};

  function updatePreise(atmosphere, society){
    for(let w in markt){
      const m = markt[w];
      const diff = m.nachfrage - m.menge;
      // Wetter + Jahreszeit Einfluss
      let faktor = 1 + (atmosphere.weather==="sturm"?0.1:0);
      if(atmosphere.season==="Winter" && w==="holz") faktor += 0.2;
      m.preis = Math.max(1, (m.preis + diff*0.05)*faktor*inflation);
    }
  }

  function getPreis(ware){
    let p = markt[ware].preis;
    if(schwarzmarkt.aktiv) p *= schwarzmarkt.aufschlag;
    return p;
  }

  return {markt,updatePreise,getPreis};
})();
