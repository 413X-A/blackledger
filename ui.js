const UI = (() => {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlayContent");
  const overlayClose = document.getElementById("overlayClose");
  const logDiv = document.getElementById("log");

  // Overlay anzeigen
  function showOverlay(text){
    if(!text) return;
    overlayContent.textContent = text;
    overlay.classList.remove("hidden");
    overlay.style.opacity = 1;
  }

  // Overlay schließen
  overlayClose.addEventListener("click", ()=>{
    overlay.style.opacity = 0;
    setTimeout(()=> overlay.classList.add("hidden"), 300);
  });

  // Log
  function log(msg){
    const p = document.createElement("p");
    p.textContent = msg;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
  }

  // UI Update
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

  // Buttons
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
      const ok = Politics.bestechen(Game.state);
      showOverlay(ok?"Bestechung erfolgreich! Steuern gesenkt":"Nicht genug Gold!");
      update(Game.state);
    });

    document.getElementById("sabotageBtn").addEventListener("click", ()=>{
      showOverlay(Crime.sabotage("Rivalen"));
    });

    document.getElementById("stealBtn").addEventListener("click", ()=>{
      showOverlay(Crime.stehlen(Game.state));
    });
  }

  function init(){
    overlay.classList.add("hidden");
    bindButtons();
    update(Game.state);
    log("Willkommen bei Black Ledger!");
  }

  return {update,log,showOverlay,init};
})();
window.addEventListener("load", UI.init);
