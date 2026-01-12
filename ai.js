const AI = (() => {
  const rivals = [
    {name:"Gilde Norden", gold:500, inventar:{}, strategie:"Handel"}, 
    {name:"Gilde Süden", gold:400, inventar:{}, strategie:"Spekulieren"}
  ];

  function entscheidung(wa, playerState, atmosphere, crime, politics){
    rivals.forEach(rival=>{
      // Grundstrategie
      let kauflust = 0;
      if(rival.strategie==="Handel") kauflust += 1;
      if(rival.strategie==="Spekulieren") kauflust += 0.5;

      // Wetter-Effekt
      if(atmosphere.weather==="sturm") kauflust -= 0.5;

      // Tageszeit
      if(atmosphere.time<6 || atmosphere.time>20) kauflust -= 0.7;

      // Crime-Heat
      kauflust -= crime.heat*0.02;

      // Politics Steuern
      kauflust -= politics.taxRate*0.01;

      // Nachfrage & Preisabhängigkeit
      const markt = Economy.markt[wa];
      const diff = markt.nachfrage - markt.menge;
      kauflust += diff*0.01;

      // Entscheidung
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

  function runAll(playerState, atmosphere, crime, politics){
    Object.keys(Economy.markt).forEach(wa=>entscheidung(wa, playerState, atmosphere, crime, politics));
  }

  return {rivals,runAll};
})();
