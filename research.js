const Research = (() => {
  const tech = {
    bookkeeping:false,
    insurance:false,
    exchange:false
  };

  function tick() {}

  function unlock(name) {
    if (tech[name] !== undefined) tech[name] = true;
  }

  return { tech, tick, unlock };
})();
