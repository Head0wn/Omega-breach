(() => {
  "use strict";
  try {
    const encoded = window.__OMEGA_B64 || "";
    if (!encoded) throw new Error("Runtime Omega absent");
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const source = new TextDecoder("utf-8").decode(bytes);
    delete window.__OMEGA_B64;
    (0, eval)(source);
  } catch (error) {
    console.error("OMEGA boot failure", error);
    const target = document.querySelector("#menu .menu-actions") || document.body;
    const message = document.createElement("p");
    message.style.cssText = "padding:12px;border:1px solid #ff5f6f;background:#240b10;color:#ffd9de;font:700 12px system-ui";
    message.textContent = "Le moteur n’a pas pu démarrer. Recharge la page sans cache.";
    target.appendChild(message);
  }
})();
