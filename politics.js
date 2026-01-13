const Politics = (() => {
  function bestechen(state){
    if(state.gold>=50){
      state.gold -=50;
      state.reputation +=5;
      return true;
    }
    return false;
  }

  return {bestechen};
})();
