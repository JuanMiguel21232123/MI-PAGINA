// Vortex Innovation Studio — comportamiento de la página informativa
(function () {
  "use strict";

  // Año del pie de página
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menú en celular
  var btn = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");
  function setOpen(open) {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "CERRAR" : "MENÚ";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () {
      setOpen(!menu.classList.contains("open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  // Resalta en la barra la sección que se está viendo
  var links = Array.prototype.slice.call(document.querySelectorAll("a.nav"));
  var map = {};
  links.forEach(function (a) {
    map[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          map[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
})();
