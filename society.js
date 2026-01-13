const Society = (() => {
  function update(state, Crime, Politics, Atmosphere){
    // Zufriedenheit sinkt, wenn Crime hoch
    const crime = Crime.heat || 0;
    state.reputation = Math.max(0, state.reputation - crime*0.01);
    document.getElementById("soc-happiness").textContent = Math.round(50+state.reputation*0.5);
  }

  return {update};
})();
