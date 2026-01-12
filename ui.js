const UI = (() => {

  function update(state) {
    // Grundwerte
    document.getElementById("ui-day").textContent = state.day;
    document.getElementById("ui-gold").textContent = state.gold.toFixed(0);
    document.getElementById("ui-rep").textContent = state.rep;
    document.getElementById("ui-debt").textContent = (state.debt || 0).toFixed(0);

    // Inventory
    ["grain","wood","iron"].forEach(g=>{
      document.getElementById("inv-"+g).textContent = state.inventory[g];
      const priceEl = document.querySelector(`.good[data-id="${g}"] .price`);
      if(priceEl) priceEl.textContent = Economy.getPrice(g).toFixed(1);
    });

    // AI
    document.getElementById("ai-gold").textContent = AI.state.gold.toFixed(0);
    document.getElementById("ai-style").textContent = AI.state.style;

    // World
    const regionsList = document.getElementById("regionsList");
    regionsList.innerHTML = "";
    World.regions.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `${r.id.toUpperCase()} – Tax: ${(r.tax*100).toFixed(1)}% – Danger: ${(r.danger*100).toFixed(1)}% – Specialty: ${r.specialty}`;
      regionsList.appendChild(li);
    });

    // Society
    document.getElementById("soc-happiness").textContent = Society.happiness.toFixed(0);
    document.getElementById("soc-faith").textContent = 50; // Placeholder, kann Society erweitern

    // Politics
    document.getElementById("pol-title").textContent = Politics.title;
    document.getElementById("pol-tax").textContent = (Politics.laws.tax*100).toFixed(1) + "%";

    // Crime
    document.getElementById("crime-heat").textContent = (Crime.heat || 0).toFixed(2);

    // Research
    document.getElementById("tech-bookkeeping").textContent = Research.tech.bookkeeping ? "Unlocked" : "Locked";
    document.getElementById("tech-insurance").textContent = Research.tech.insurance ? "Unlocked" : "Locked";
    document.getElementById("tech-exchange").textContent = Research.tech.exchange ? "Unlocked" : "Locked";

    // Atmosphere
    document.getElementById("atm-time").textContent = Atmosphere.isNight() ? `${Atmosphere.time}:00 (Night)` : `${Atmosphere.time}:00 (Day)`;
    document.getElementById("atm-weather").textContent = Atmosphere.weather;
  }

  // Log-Events
  function log(msg) {
    const el = document.getElementById("log");
    el.textContent = msg;
    el.animate([{opacity:0},{opacity:1}],{duration:300});
  }

  // Event-Bindings für Buttons (Touch + Click)
  function bindButtons() {
    const bribeBtn = document.getElementById("bribeBtn");
    if(bribeBtn) {
      bribeBtn.addEventListener("click", ()=> {
        const success = Politics.bribe(50, Game.state);
        UI.log(success ? "Bribe successful, tax reduced!" : "Not enough gold to bribe!");
        UI.update(Game.state);
      });
    }

    const sabotageBtn = document.getElementById("sabotageBtn");
    if(sabotageBtn) {
      sabotageBtn.addEventListener("click", ()=>{
        const msg = Crime.sabotage("Rival");
        UI.log(msg);
        UI.update(Game.state);
      });
    }

    const stealBtn = document.getElementById("stealBtn");
    if(stealBtn) {
      stealBtn.addEventListener("click", ()=>{
        const msg = Crime.steal(Game.state);
        UI.log(msg);
        UI.update(Game.state);
      });
    }
  }

  // Initialisierung
  function init() {
    bindButtons();
    update(Game.state);
    log("Welcome to Black Ledger (Mobile-Optimized)");
  }

  return { update, log, init };
})();

// Start UI
window.addEventListener("load", UI.init);
