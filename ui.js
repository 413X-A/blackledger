const UI = (() => {

  function update(state) {
    document.getElementById("ui-day").textContent = state.day;
    document.getElementById("ui-gold").textContent = state.gold.toFixed(0);
    document.getElementById("ui-rep").textContent = state.rep;

    ["grain","wood","iron"].forEach(g=>{
      document.getElementById("inv-"+g).textContent = state.inventory[g];
      document.querySelector(`.good[data-id="${g}"] .price`)
        .textContent = Economy.market[g].price.toFixed(1);
    });

    document.getElementById("ai-gold").textContent = AI.state.gold.toFixed(0);
    document.getElementById("ai-style").textContent = AI.state.style;
  }

  function log(msg) {
    const el = document.getElementById("log");
    el.textContent = msg;
    el.animate([{opacity:0},{opacity:1}],{duration:300});
  }

  return { update, log };
})();
