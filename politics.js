const Politics = (() => {
  let taxRate = 10;
  let lastBribeSuccess = false;

  function bestechen(playerState){
    if(playerState.gold>=100){
      playerState.gold -= 100;
      taxRate = Math.max(0, taxRate-3);
      lastBribeSuccess = true;
      return true;
    }
    lastBribeSuccess=false;
    return false;
  }

  return {taxRate,bestechen,lastBribeSuccess};
})();
