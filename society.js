const Society = (() => {
  let happiness = 60;
  let faith = 50;

  function tick() {
    happiness += Math.random()*2 - 1;
    faith += Math.random()*2 - 1;
  }

  function checkRevolt() {
    return happiness < 20 && Math.random() < 0.3;
  }

  return { tick, checkRevolt, get happiness(){return happiness;} };
})();
