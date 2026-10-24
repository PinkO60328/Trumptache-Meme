(function(){
  // Solana mint: base58, 32–44 chars. Placeholder strings like "CommingSoon" fail length.
  const valid = typeof CA === "string"
    && CA.length >= 32 && CA.length <= 44
    && /^[1-9A-HJ-NP-Za-km-z]+$/.test(CA)
    && CA !== "CommingSoon";

  document.querySelectorAll(".ca-val").forEach(e => { e.textContent = CA; });
  document.querySelectorAll(".chain").forEach(e => { e.textContent = CHAIN; });

  document.querySelectorAll(".xlink").forEach(a => {
    if (!X_LINK) {
      a.style.display = "none";
      a.setAttribute("aria-hidden", "true");
      a.removeAttribute("href");
      return;
    }
    a.href = X_LINK;
    a.target = "_blank";
    a.rel = "noopener";
    a.style.display = "";
    a.removeAttribute("aria-hidden");
  });

  const buy = valid ? "https://pump.fun/coin/" + CA : "";
  const dex = valid ? "https://dexscreener.com/solana/" + CA : "";

  document.querySelectorAll(".buy, .pump").forEach(a => {
    if (!valid) {
      a.style.display = "none";
      a.setAttribute("aria-hidden", "true");
      a.removeAttribute("href");
      return;
    }
    a.href = buy;
    a.target = "_blank";
    a.rel = "noopener";
    a.style.display = "";
  });

  document.querySelectorAll(".dex").forEach(a => {
    if (!valid) {
      a.style.display = "none";
      a.setAttribute("aria-hidden", "true");
      a.removeAttribute("href");
      return;
    }
    a.href = dex;
    a.target = "_blank";
    a.rel = "noopener";
    a.style.display = "";
  });

  document.querySelectorAll(".copy").forEach(b => {
    b.onclick = () => {
      const done = () => {
        b.textContent = "copied";
        setTimeout(() => { b.textContent = "copy"; }, 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(CA).then(done, fb);
      } else {
        fb();
      }
      function fb() {
        const t = document.createElement("textarea");
        t.value = CA;
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        t.remove();
        done();
      }
    };
  });

  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
})();
