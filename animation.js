const Animations = (() => {

  function goldFlash() {
    const el = document.getElementById("ui-gold");
    el.animate(
      [{color:"gold", transform:"scale(1.2)"},{color:"#f5e6c8", transform:"scale(1)"}],
      {duration:400}
    );
  }

  function lossShake() {
    document.getElementById("game").animate(
      [{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],
      {duration:300}
    );
  }

  return { goldFlash, lossShake };
})();
