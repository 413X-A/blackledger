const Animations = (()=>{
  function animateCoinForRival(w,rivalName){
    const el=document.createElement("div");
    el.className="coin-glow";
    el.textContent="💰";
    document.body.appendChild(el);
    el.style.left=Math.random()*window.innerWidth+"px";
    el.style.top=window.innerHeight+"px";
    let y=window.innerHeight;
    const id=setInterval(()=>{
      y-=5; el.style.top=y+"px";
      if(y<200){ clearInterval(id); el.remove(); }
    },16);
  }
  return {animateCoinForRival};
})();
