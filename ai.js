const AI = (() => {
  const rivals = [
    {name:"Gilde Norden", gold:500, inventar:{}, plan:{ziel:"Vorrat", wartezeit:0}},
    {name:"Gilde Süden", gold:400, inventar:{}, plan:{ziel:"Spekulieren", wartezeit:0}}
  ];

  function entscheidung(playerState, atmosphere, crime, politics, society){
    Object.keys(Economy.markt).forEach(w=>{
      rivals.forEach(rival=>{
        // Langfristiger Plan
        if(rival.plan.wartezeit>0) rival.plan.wartezeit--;
        else{
          switch(rival.plan.ziel){
            case "Vorrat":
              if(rival.gold>=Economy.markt[w].preis){
                rival.inventar[w] = (rival.inventar[w]||0)+1;
                rival.gold -= Economy.markt[w].preis;
                UI.log(`${rival.name} legt Vorräte von ${w} an`);
              }
              rival.plan.wartezeit = 2; break;
            case "Spekulieren":
              if(Economy.markt[w].season===atmosphere.getSeason() && rival.gold>=Economy.markt[w].preis){
                rival.inventar[w] = (rival.inventar[w]||0)+1;
                rival.gold -= Economy.markt[w].preis;
                UI.log(`${rival.name} spekuliert auf ${w}`);
              }
              rival.plan.wartezeit=1; break;
          }
        }

        // Reagiere auf Spieler
        if(playerState.inventar[w]>5){
          if(rival.gold>=Economy.markt[w].preis){
            rival.inventar[w] = (rival.inventar[w]||0)+1;
            rival.gold -= Economy.markt[w].preis;
            UI.showOverlay(`${rival.name} kauft große Mengen ${w} um Preis zu drücken!`);
          }
        }

        // Reagiere auf Bestechung
        if(politics.lastBribeSuccess){
          rival.plan.ziel = "Preismanipulation";
          UI.log(`${rival.name} reagiert auf Bestechung`);
        }
      });
    });
  }

  return {rivals,entscheidung};
})();
