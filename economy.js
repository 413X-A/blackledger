const Economy = (() => {
  const market = {
    grain: { price: 10, supply: 100, demand: 100, quality: 1 },
    wood:  { price: 20, supply: 80,  demand: 80,  quality: 1 },
    iron:  { price: 40, supply: 50,  demand: 60,  quality: 1 }
  };

  let inflation = 1.0;
  let creditRate = 0.05;

  const blackMarket = {
    active: false,
    markup: 1.8
  };

  function updatePrices() {
    for (let g in market) {
      const m = market[g];
      const pressure = (m.demand - m.supply) * 0.05;
      const volatility = (Math.random() - 0.5) * 0.5;
      m.price = Math.max(1, (m.price + pressure + volatility) * inflation);
    }
  }

  function takeLoan(state, amount) {
    state.gold += amount;
    state.debt = (state.debt || 0) + amount * (1 + creditRate);
  }

  function repayDebt(state, amount) {
    if (!state.debt) return;
    const pay = Math.min(amount, state.debt);
    if (state.gold >= pay) {
      state.gold -= pay;
      state.debt -= pay;
    }
  }

  function randomEvent() {
    if (Math.random() < 0.25) {
      const events = ["harvest","fire","war","inflation","blackmarket"];
      return events[Math.floor(Math.random()*events.length)];
    }
    return null;
  }

  function applyEvent(ev) {
    if (ev === "harvest") market.grain.supply += 30;
    if (ev === "fire") market.wood.supply -= 20;
    if (ev === "war") market.iron.demand += 25;
    if (ev === "inflation") inflation = Math.min(1.5, inflation + 0.05);
    if (ev === "blackmarket") blackMarket.active = true;
  }

  function getPrice(g) {
    let p = market[g].price;
    if (blackMarket.active) p *= blackMarket.markup;
    return p;
  }

  return { market, updatePrices, randomEvent, applyEvent, takeLoan, repayDebt, getPrice };
})();
