const AI = (() => {
  const rivals = [
    {name:"Königs Handel", type:"Aggressiv", gold:500, inventar:{korn:10, holz:5,eisen:2,wein:0,gewuerze:0,stoffe:0}},
    {name:"Silbermarkt", type:"Defensiv", gold:400, inventar:{korn:5, holz:5,eisen:5,wein:1,gewuerze:0,stoffe:0}}
  ];

  function entscheidung(playerState, Atmosphere, Crime, Politics, Society){
    rivals.forEach(r => {
      // Einfaches KI Verhalten
      const ware = Object.keys(r.inventar)[Math.floor(Math.random()*6)];
      r.inventar[ware] += 1; // kaufen
      UI.log(`${r.name} kauft 1 ${ware}`);
      Animations.animateCoinForRival(ware, r.name);
    });
  }

  return {rivals, entscheidung};
})();
