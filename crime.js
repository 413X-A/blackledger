const Crime = (() => {
  let heat = 0;

  function sabotage(target){
    const erfolg = Math.random() < 0.7;
    heat += 5;
    document.getElementById("crime-heat").textContent = heat;
    if(erfolg) return `Sabotage erfolgreich gegen ${target}!`;
    else return `Sabotage fehlgeschlagen gegen ${target}!`;
  }

  function stehlen(playerState){
    const erfolg = Math.random() < 0.5;
    heat += 10;
    document.getElementById("crime-heat").textContent = heat;
    if(erfolg){
      const gewinn = 50 + Math.floor(Math.random()*50);
      playerState.gold += gewinn;
      UI.update(playerState);
      return `Diebstahl erfolgreich! Du hast ${gewinn} Gold erbeutet.`;
    } else return "Diebstahl misslungen! Heat erhöht sich.";
  }

  return {sabotage,stehlen,heat};
})();
