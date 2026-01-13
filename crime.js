const Crime = (() => {
  let heat = 0;

  function sabotage(target){
    heat += 10;
    return `Sabotage gegen ${target} durchgeführt! Heat +10`;
  }

  function stehlen(playerState){
    heat += 5;
    const gold = Math.min(50, playerState.gold);
    playerState.gold -= gold;
    return `Du wurdest bestohlen! Verlust: ${gold} Gold. Heat +5`;
  }

  return {heat,sabotage,stehlen};
})();
