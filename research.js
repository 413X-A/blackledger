const Research = (() => {
  const tech = {bookkeeping:false, insurance:false, exchange:false};

  function forschen(name){
    tech[name]=true;
    UI.log(`Forschung abgeschlossen: ${name}`);
  }

  return {tech,forschen};
})();
