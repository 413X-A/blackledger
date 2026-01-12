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

  function updatePreise(){
    for(let w in markt){
      const m = markt[w];
      const druck = (m.nachfrage - m.menge)*0.05;
      const vol = (Math.random()-0.5)*0.5;
      m.preis = Math.max(1,(m.preis+druck+vol)*inflation);
    }
  }

  function zufallsEvent(){
    if(Math.random()<0.25){
      const events=["ernten","brand","krieg","inflation","schwarzmarkt"];
      return events[Math.floor(Math.random()*events.length)];
    }
    return null;
  }

  function wendeEvent(evt){
    switch(evt){
      case "ernten": markt.korn.menge+=30; break;
      case "brand": markt.holz.menge-=20; break;
      case "krieg": markt.eisen.nachfrage+=25; break;
      case "inflation": inflation=Math.min(1.5,inflation+0.05); break;
      case "schwarzmarkt": schwarzmarkt.aktiv=true; break;
    }
  }

  function getPreis(ware){
    let p = markt[ware].preis;
    if(schwarzmarkt.aktiv) p*=schwarzmarkt.aufschlag;
    return p;
  }

  return {markt,updatePreise,zufallsEvent,wendeEvent,getPreis};
})();
