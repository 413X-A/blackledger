const Politics = (() => {
  let taxRate = 10;
  let title = "Händler";

  function bestechen(playerState){
    const kosten = 50;
    if(playerState.gold >= kosten){
      playerState.gold -= kosten;
      taxRate = Math.max(0, taxRate - 3);
      UI.update(playerState);
      return true;
    }
    return false;
  }

  function updateUI(){
    document.getElementById("pol-tax").textContent = taxRate + "%";
    document.getElementById("pol-title").textContent = title;
  }

  return {bestechen,updateUI,taxRate,title};
})();
