const UI = (() => {

  // UI aktualisieren: Tag, Gold, Lager, Preise
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
  }

  // Log-Funktion für Marktbewegungen, KI und kleinere Events
  function log(msg){
    const el = document.getElementById("log");
    const p = document.createElement("p");
    p.textContent = msg;
    el.appendChild(p);
    el.scrollTop = el.scrollHeight;
    p.animate([{opacity:0},{opacity:1}],{duration:300});
  }

  // Buttons binden
  function bindButtons(){
    // Kaufen / Verkaufen
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

    // Bestechung
    document.getElementById("bribeBtn").addEventListener("click", ()=>{
      const erfolg = Politics.bestechen(Game.state);
      UI.showOverlay(erfolg ? "Bestechung erfolgreich! Steuern gesenkt." : "Nicht genug Gold!");
      UI.update(Game.state);
    });

    // Sabotage & Stehlen
    document.getElementById("sabotageBtn").addEventListener("click", ()=>{
      const msg = Crime.sabotage("Rivalen");
      UI.showOverlay(msg);
    });

    document.getElementById("stealBtn").addEventListener("click", ()=>{
      const msg = Crime.stehlen(Game.state);
      UI.showOverlay(msg);
    });

    // Overlay schließen
    document.getElementById("overlayClose").addEventListener("click", ()=>{
      document.getElementById("overlay").classList.add("hidden");
    });
  }

  // Overlay anzeigen
  function showOverlay(text){
    if(!text) return;
    const overlay = document.getElementById("overlay");
    document.getElementById("overlayContent").textContent = text;
    overlay.classList.remove("hidden");
  }

  // Init UI
  function init(){
    // Overlay initial verstecken
    const overlay = document.getElementById("overlay");
    overlay.classList.add("hidden");

    bindButtons();
    update(Game.state);
    log("Willkommen bei Black Ledger!");
  }

  return {update,log,init,showOverlay};
})();

// UI initialisieren
window.addEventListener("load", UI.init);
