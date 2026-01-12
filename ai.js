const AI = (() => {
  const rivals = [
    {name:"Gilde Norden", gold:500, inventar:{}, strategie:"Handel", plan:{ziel:"Vorrat", wartezeit:0}},
    {name:"Gilde Süden", gold:400, inventar:{}, strategie:"Spekulieren", plan:{ziel:"Preismanipulation", wartezeit:0}}
  ];

  function entscheidung(wa, playerState, atmosphere, crime, politics, society){
    rivals.forEach(rival=>{
      // Langfristige Pläne prüfen
      if(rival.plan.wartezeit>0){
        rival.plan.wartezeit--;
      } else {
        switch(rival.plan.ziel){
          case "Vorrat":
            if(rival.gold>=Economy.markt[wa].preis && Economy.markt[wa].preis<20){
              rival.inventar[wa] = (rival.inventar[wa]||0)+1;
              rival.gold -= Economy.markt[wa].preis;
              UI.log(`${rival.name} legt Vorräte von ${wa} an.`);
            }
            rival.plan.wartezeit = 2; // wartet 2 Tage
            break;

          case "Preismanipulation":
            if(rival.inventar[wa]>0){
              rival.inventar[wa]--;
              rival.gold += Economy.markt[wa].preis;
              Economy.markt[wa].menge += 1;
              UI.log(`${rival.name} verkauft ${wa}, um Preis zu manipulieren.`);
            }
            rival.plan.wartezeit = 1;
            break;

          case "Spekulieren":
            // kauft wenn Saison günstig
            if(Economy.markt[wa].season===atmosphere.getSeason() && rival.gold>=Economy.markt[wa].preis){
              rival.inventar[wa] = (rival.inventar[wa]||0)+1;
              rival.gold -= Economy.markt[wa].preis;
              UI.log(`${rival.name} spekuliert auf ${wa}.`);
            }
            rival.plan.wartezeit = 1;
            break;
        }
      }

      // Dynamische Kauf/Verkauf Entscheidung nach Tageszeit, Wetter, Crime, Politik, Bevölkerung
      let kauflust = 0.5;
      if(atmosphere.weather==="sturm") kauflust -= 0.3;
      if(atmosphere.time<6 || atmosphere.time>20) kauflust -= 0.2;
      kauflust -= crime.heat*0.02;
      kauflust -= politics.taxRate*0.01;
      kauflust += (Economy.markt[wa].nachfrage - Economy.markt[wa].menge)*0.01;
      if(society.happiness<40) kauflust -= 0.1;

      if(kauflust>0.5 && rival.gold >= Economy.markt[wa].preis){
        rival.gold -= Economy.markt[wa].preis;
        rival.inventar[wa] = (rival.inventar[wa]||0)+1;
        Economy.markt[wa].nachfrage += 2;
        UI.log(`${rival.name} kauft 1 ${wa} (Kurzfristentscheidung).`);
      } else if(rival.inventar[wa]>0 && kauflust<0){
        rival.inventar[wa]--;
        rival.gold += Economy.markt[wa].preis;
        Economy.markt[wa].menge += 1;
        UI.log(`${rival.name} verkauft 1 ${wa} (Kurzfristentscheidung).`);
      }

      // Neue Strategien zufällig anpassen
      if(Math.random()<0.05){
        const optionen=["Vorrat","Preismanipulation","Spekulieren"];
        rival.plan.ziel = optionen[Math.floor(Math.random()*optionen.length)];
        rival.plan.wartezeit = 1;
        UI.log(`${rival.name} plant jetzt: ${rival.plan.ziel}`);
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
