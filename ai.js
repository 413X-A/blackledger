const AI = (() => {
  const state = {
    gold: 500,
    inventory: { grain:0, wood:0, iron:0 },
    style: "Aggressive",
    memory: { betrayed: false }
  };

  function spyOn(playerState) {
    if (Math.random() < 0.2) {
      return `Rival spies learned your gold: ${playerState.gold}`;
    }
    return null;
  }

  function takeTurn(market, playerState) {
    const goods = ["grain","wood","iron"];
    const g = goods[Math.floor(Math.random()*goods.length)];
    const price = market[g].price;

    let msg = spyOn(playerState);
    if (msg) return msg;

    if (Math.random() < 0.6 && state.gold >= price) {
      state.gold -= price;
      state.inventory[g]++;
      market[g].demand += 2;
      return `Rival Guild bought ${g}`;
    } else if (state.inventory[g] > 0) {
      state.inventory[g]--;
      state.gold += price;
      market[g].supply += 2;
      return `Rival Guild sold ${g}`;
    }
    return null;
  }

  return { state, takeTurn };
})();
