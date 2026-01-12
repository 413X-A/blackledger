const Game = (() => {

  const state = {
    day: 1,
    gold: 500,
    rep: 50,
    inventory: { grain:0, wood:0, iron:0 }
  };

  function buy(g) {
    const p = Economy.market[g].price;
    if (state.gold >= p) {
      state.gold -= p;
      state.inventory[g]++;
      Economy.market[g].demand++;
      Animations.goldFlash();
      UI.log(`You bought ${g}`);
    } else {
      Animations.lossShake();
      UI.log("Not enough gold!");
    }
  }

  function sell(g) {
    if (state.inventory[g] > 0) {
      const p = Economy.market[g].price;
      state.gold += p;
      state.inventory[g]--;
      Economy.market[g].supply++;
      Animations.goldFlash();
      UI.log(`You sold ${g}`);
    }
  }

  function nextDay() {
    state.day++;

    const ev = Economy.randomEvent();
    if (ev) {
      Economy.applyEvent(ev);
      UI.log(`Event: ${ev}`);
    }

    const aiMsg = AI.takeTurn(Economy.market);
    if (aiMsg) UI.log(aiMsg);

    Economy.updatePrices();
    UI.update(state);
  }

  function init() {
    document.querySelectorAll(".buy").forEach(btn=>{
      btn.onclick = e=>{
        const g = e.target.closest(".good").dataset.id;
        buy(g); UI.update(state);
      };
    });

    document.querySelectorAll(".sell").forEach(btn=>{
      btn.onclick = e=>{
        const g = e.target.closest(".good").dataset.id;
        sell(g); UI.update(state);
      };
    });

    document.getElementById("nextDayBtn").onclick = nextDay;

    UI.update(state);
    UI.log("Welcome to Black Ledger.");
  }

  return { init };
})();

window.onload = Game.init;
