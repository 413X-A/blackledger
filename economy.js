const Economy = (() => {
  const basePreise = {korn:5, holz:10, eisen:20, wein:15, gewuerze:50, stoffe:25};

  function getPreis(w){
    const preis = basePreise[w] * (1 + Math.random()*0.2-0.1); // +-10% Zufall
    return Math.max(1, preis);
  }

  function updatePreise(state, rivals, Society, Atmosphere){
    // Dynamische Anpassung nach Angebot/Nachfrage & Jahreszeit
    Object.keys(state.inventar).forEach(w => {
      let faktor = 1;
      // Jahreszeiteneinfluss
      if(w === "korn" && Atmosphere.season === "Winter") faktor = 1.5;
      // KI-Käufe/Verkäufe
      rivals.forEach(r => {
        faktor += r.inventar[w]*0.01;
      });
      basePreise[w] *= faktor;
    });
  }

  return {getPreis, updatePreise};
})();
