const Game = (() => {
  const state = {
    day: 1,
    phase: 1, // 1 village → 2 town → 3 realm → 4 empire
    gold: 500,
    rep: 50,
    inventory: { grain:0, wood:0, iron:0 },
    flags: { endgameUnlocked: false }
  };

  function advancePhaseIfNeeded() {
    if (state.gold > 5000) state.phase = 2;
    if (state.gold > 20000) state.phase = 3;
    if (state.gold > 100000) state.phase = 4;
  }

  function checkVictory() {
    if (state.flags.endgameUnlocked) return;
    if (state.phase === 4 && state.rep > 90) {
      state.flags.endgameUnlocked = true;
      console.log("Endgame unlocked (to be continued).");
    }
  }

  function nextDay() {
    state.day++;

    Atmosphere.tick();
    Society.tick();
    Politics.tick();
    Crime.tick();
    Research.tick();

    const ev = Economy.randomEvent();
    if (ev) Economy.applyEvent(ev);

    const aiMsg = AI.takeTurn(Economy.market, state);
    if (aiMsg) UI.log(aiMsg);

    Economy.updatePrices();
    advancePhaseIfNeeded();
    checkVictory();
    UI.update(state);
  }

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

  function initBindings() {
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
  }

  function init() {
    initBindings();
    UI.update(state);
    UI.log("Welcome to Black Ledger.");
  }

  return { init, nextDay, state };
})();
window.onload = Game.init;
