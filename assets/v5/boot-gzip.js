(() => {
  "use strict";
  const fail = (error) => {
    console.error("OMEGA boot failure", error);
    const target = document.querySelector("#menu .menu-actions") || document.body;
    const message = document.createElement("p");
    message.style.cssText = "padding:12px;border:1px solid #ff5f6f;background:#240b10;color:#ffd9de;font:700 12px system-ui";
    message.textContent = "Le moteur n’a pas pu démarrer. Recharge la page sans cache.";
    target.appendChild(message);
  };

  (async () => {
    try {
      const encoded = window.__OMEGA_GZ || "";
      if (!encoded) throw new Error("Archive Omega absente");
      if (!("DecompressionStream" in window)) throw new Error("Décompression non prise en charge");
      const binary = atob(encoded);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
      const source = await new Response(stream).text();
      delete window.__OMEGA_GZ;
      (0, eval)(source);
    } catch (error) {
      fail(error);
    }
  })();
})();
