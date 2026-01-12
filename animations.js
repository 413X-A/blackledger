const Animations = (() => {
  function highlightPanel(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.animate([{boxShadow:"0 0 0 gold"},{boxShadow:"0 0 15px gold"}],{duration:500,iterations:2});
  }

  return {highlightPanel};
})();
