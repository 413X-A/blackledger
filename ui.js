const UI = (() => {
  function update(state){
    document.getElementById("ui-day").textContent = state.tag;
    document.getElementById("ui-gold").textContent = Math.round(state.gold);
    document.getElementById("ui-rep").textContent = Math.round(state.reputation);
    document.getElementById("ui-debt").textContent = Math.round(state.schulden);

    ["korn","holz","eisen","wein","gewuerze","stoffe"].forEach(g=>{
      document.getElementById("inv-"+g).textContent = state.inventar[g];
      const priceEl=document.querySelector(`.good[data-id="${g}"] .price`);
      if(priceEl) priceEl.textContent = Economy.getPreis(g).toFixed(1);
    });
  }

  function log(msg){
    const el=document.getElementById("log");
    el.textContent=msg;
  }

  function showOverlay(text){
    if(!text) return;
    const overlay = document.getElementById("overlay");
    document.getElementById("overlayContent").textContent=text;
    overlay.classList.remove("hidden");
    overlay.style.opacity=1;
  }

  function hideOverlay(){
    const overlay=document.getElementById("overlay");
    overlay.classList.add("hidden");
  }

  function bindButtons(){
    document.querySelectorAll(".buy").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const w=e.currentTarget.closest(".good").dataset.id;
        Game.kaufen(w);
      });
    });
    document.querySelectorAll(".sell").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const w=e.currentTarget.closest(".good").dataset.id;
        Game.verkaufen(w);
      });
    });
    document.getElementById("bribeBtn").addEventListener("click", ()=>{
      const success = Politics.bestechen(Game.state);
      showOverlay(success?"Bestechung erfolgreich!":"Nicht genug Gold!");
    });
    document.getElementById("sabotageBtn").addEventListener("click", ()=>{
      showOverlay(Crime.sabotage("Rivalen"));
    });
    document.getElementById("stealBtn").addEventListener("click", ()=>{
      showOverlay(Crime.stehlen(Game.state));
    });
    document.getElementById("overlayClose").addEventListener("click", hideOverlay);
  }

  return {update,log,bindButtons,showOverlay};
})();
window.addEventListener("load", UI.bindButtons);
