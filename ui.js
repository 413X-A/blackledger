const UI = (() => {
  function update(state){
    document.getElementById("ui-day").textContent = state.tag;
    document.getElementById("ui-gold").textContent = state.gold.toFixed(0);
    document.getElementById("ui-rep").textContent = state.reputation;
    document.getElementById("ui-debt").textContent = (state.schulden||0).toFixed(0);

    ["korn","holz","eisen","wein","gewuerze","stoffe"].forEach(g=>{
      document.getElementById("inv-"+g).textContent = state.inventar[g];
      const priceEl = document.querySelector(`.good[data-id="${g}"] .price`);
      if(priceEl) priceEl.textContent = Economy.getPreis(g).toFixed(1);
    });

    // Overlay wird für AI / Events benutzt
  }

  function log(msg){
    const el = document.getElementById("log");
    el.textContent = msg;
    el.animate([{opacity:0},{opacity:1}],{duration:300});
  }

  function bindButtons(){
    document.querySelectorAll(".buy").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const ware = e.currentTarget.closest(".good").dataset.id;
        Game.kaufen(ware);
      });
    });
    document.querySelectorAll(".sell").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const ware = e.currentTarget.closest(".good").dataset.id;
        Game.verkaufen(ware);
      });
    });

    document.getElementById("bribeBtn").addEventListener("click", ()=>{
      const erfolg = Politics.bestechen(Game.state);
      UI.showOverlay(erfolg ? "Bestechung erfolgreich! Steuern gesenkt." : "Nicht genug Gold!");
    });

    document.getElementById("sabotageBtn").addEventListener("click", ()=>{
      const msg = Crime.sabotage("Rivalen");
      UI.showOverlay(msg);
    });

    document.getElementById("stealBtn").addEventListener("click", ()=>{
      const msg = Crime.stehlen(Game.state);
      UI.showOverlay(msg);
    });

    document.getElementById("overlayClose").addEventListener("click", ()=>{
      document.getElementById("overlay").classList.add("hidden");
    });
  }

  UI.showOverlay = (text)=>{
    if(!text) return; // Keine Meldung → kein Overlay
    const overlay = document.getElementById("overlay");
    document.getElementById("overlayContent").textContent = text;
    overlay.classList.remove("hidden");
};

  function init(){
    bindButtons();
    update(Game.state);
    log("Willkommen bei Black Ledger!");
  }

  return {update,log,init,showOverlay};
})();

window.addEventListener("load", UI.init);
