const UI = (() => {

  // Overlay-Container und Content
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlayContent");
  const overlayClose = document.getElementById("overlayClose");
  const logDiv = document.getElementById("log");

  // Initialisierung Overlay
  overlay.classList.add("hidden"); // unsichtbar beim Start

  // -------------------
  // Overlay anzeigen
  // -------------------
  function showOverlay(text){
    if(!text) return;
    overlayContent.textContent = text;
    overlay.classList.remove("hidden");
    overlay.style.opacity = 0;
    overlay.animate([{opacity:0},{opacity:1}], {duration:400, fill:"forwards"});
  }

  // Overlay schließen
  overlayClose.addEventListener("click", ()=>{
    overlay.animate([{opacity:1},{opacity:0}], {duration:300, fill:"forwards"}).onfinish = ()=>{
      overlay.classList.add("hidden");
    };
  });

  // -------------------
  // Log-Funktion
  // -------------------
  function log(msg){
    if(!msg) return;
    const p = document.createElement("p");
    p.textContent = msg;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
    p.animate([{opacity:0},{opacity:1}], {duration:300});
  }

  // -------------------
  // UI Update
  // -------------------
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

  // -------------------
  // Button-Bindings
  // -------------------
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
      if(erfolg){
        showOverlay("Bestechung erfolgreich! Steuern gesenkt.");
      } else {
        showOverlay("Nicht genug Gold für Bestechung!");
      }
      update(Game.state);
    });

    // Sabotage & Stehlen
    document.getElementById("sabotageBtn").addEventListener("click", ()=>{
      const msg = Crime.sabotage("Rivalen");
      showOverlay(msg);
    });

    document.getElementById("stealBtn").addEventListener("click", ()=>{
      const msg = Crime.stehlen(Game.state);
      showOverlay(msg);
    });
  }

  // -------------------
  // Init
  // -------------------
  function init(){
    bindButtons();
    update(Game.state);
    log("Willkommen bei Black Ledger!");

    // Sicherstellen, dass Overlay **immer versteckt ist**
    overlay.classList.add("hidden");
  }

  return {update,log,showOverlay,init};
})();

// -------------------
// Fenster-Load
// -------------------
window.addEventListener("load", UI.init);
