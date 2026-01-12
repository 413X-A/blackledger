const Crime = (() => {
  let heat = 0;

  function tick() {
    heat = Math.max(0, heat - 0.01);
  }

  function sabotage(target) {
    heat += 0.2;
    if (Math.random() < 0.6) return `Sabotage successful against ${target}`;
    return `Sabotage failed against ${target}`;
  }

  function steal(state) {
    heat += 0.1;
    const gain = Math.floor(Math.random()*50);
    state.gold += gain;
    return `Stole ${gain} gold`;
  }

  return { tick, sabotage, steal };
})();
