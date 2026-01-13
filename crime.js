const Crime = (() => {
  let heat = 0;

  function sabotage(target){
    heat +=5;
    return `Sabotage gegen ${target} durchgeführt! Verdacht steigt.`;
  }

  function stehlen(state){
    if(Math.random()<0.5){
      const geld = Math.floor(Math.random()*50+10);
      state.gold += geld;
      heat += 5;
      return `Du stiehlst ${geld} Gold!`;
    }
    heat +=5;
    return "Die Aktion scheiterte!";
  }

  return {sabotage, stehlen, heat};
})();
