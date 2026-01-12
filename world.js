const World = (() => {
  const regions = [
    { id:"north", tax:0.1, danger:0.2, specialty:"wood" },
    { id:"east",  tax:0.15, danger:0.3, specialty:"iron" },
    { id:"south", tax:0.05, danger:0.1, specialty:"grain" }
  ];

  function travelRisk(regionId) {
    const r = regions.find(x=>x.id===regionId);
    if (!r) return false;
    return Math.random() < r.danger;
  }

  return { regions, travelRisk };
})();
