const Economy = (() => {

  const market = {
    grain: { price: 10, supply: 100, demand: 100 },
    wood:  { price: 20, supply: 80,  demand: 80  },
    iron:  { price: 40, supply: 50,  demand: 60  }
  };

  function updatePrices() {
    for (let g in market) {
      const m = market[g];
      const pressure = (m.demand - m.supply) * 0.05;
      const volatility = (Math.random() - 0.5) * 0.5;
      m.price = Math.max(1, m.price + pressure + volatility);
    }
  }

  function applyEvent(event) {
    if (event === "harvest") market.grain.supply += 30;
    if (event === "fire") market.wood.supply -= 20;
    if (event === "war") market.iron.demand += 25;
  }

  function randomEvent() {
    if (Math.random() < 0.25) {
      const events = ["harvest","fire","war"];
      return events[Math.floor(Math.random()*events.length)];
    }
    return null;
  }

  return { market, updatePrices, applyEvent, randomEvent };
})();
