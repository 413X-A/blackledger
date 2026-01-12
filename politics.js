const Politics = (() => {
  let laws = { tax: 0.1 };
  let title = "Merchant";

  function tick() {
    if (Math.random() < 0.05) laws.tax += 0.01;
  }

  function bribe(amount, state) {
    if (state.gold >= amount) {
      state.gold -= amount;
      laws.tax = Math.max(0.05, laws.tax - 0.02);
      return true;
    }
    return false;
  }

  function grantTitle(newTitle) { title = newTitle; }

  return { tick, bribe, grantTitle, get laws(){return laws;}, get title(){return title;} };
})();
