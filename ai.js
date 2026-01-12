const AI = (() => {
  const rivals = [
    {name:"Gilde Norden", gold:500, inventar:{}, strategie:"Handel"}, 
    {name:"Gilde Süden", gold:400, inventar:{}, strategie:"Spekulieren"}
  ];

  function entscheidung(wa, playerState, atmosphere, crime, politics, society){
    rivals.forEach(rival=>{
      let kauflust = 0.5;
      // Wetter, Tageszeit, Crime, Politik, Markt
      if(atmosphere.weather==="sturm") kauflust -= 0.3;
      if(atmosphere.time<6 || atmosphere.time>20) kauflust -= 0.2;
      kauflust -= crime.heat*0.02;
      kauflust -= politics.taxRate*0.01;
      const markt = Economy.markt[wa];
      kauflust += (markt.nachfrage - markt.menge)*0.01;
      if(society.happiness<40) kauflust -= 0.1;

      // Aktion
      if(kauflust>0.5 && rival.gold >= markt.preis){
        rival.gold -= markt.preis;
        rival.inventar[wa] = (rival.inventar[wa]||0)+1;
        markt.nachfrage += 2;
        UI.log(`${rival.name} hat 1 ${wa} gekauft.`);
      } else if(rival.inventar[wa]>0 && kauflust<0){
        rival.inventar[wa]--;
        rival.gold += markt.preis;
        markt.menge += 1;
        UI.log(`${rival.name} hat 1 ${wa} verkauft.`);
      }
    });
  }

  function runAll(playerState, atmosphere, crime, politics, society){
    Object.keys(Economy.markt).forEach(wa=>{
      entscheidung(wa, playerState, atmosphere, crime, politics, society);
    });
  }

  return {rivals,runAll};
})();
