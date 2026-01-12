const Research = (() => {
  let tech = {
    buchhaltung:false,
    versicherung:false,
    boerse:false
  };

  function forschen(name){
    if(!tech[name]){
      tech[name] = true;
      UI.showOverlay(`Forschung abgeschlossen: ${name}!`);
      return true;
    } else {
      UI.showOverlay(`${name} ist bereits erforscht!`);
      return false;
    }
  }

  function updateUI(){
    document.getElementById("tech-bookkeeping").textContent = tech.buchhaltung ? "Fertig" : "Gesperrt";
    document.getElementById("tech-insurance").textContent = tech.versicherung ? "Fertig" : "Gesperrt";
    document.getElementById("tech-exchange").textContent = tech.boerse ? "Fertig" : "Gesperrt";
  }

  return {tech,forschen,updateUI};
})();
