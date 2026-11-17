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

// Formulario de contacto: arma el mensaje y abre WhatsApp o el correo
(function () {
  "use strict";
  var WA = "573207249502";
  var MAIL = "vortexinnovation2026@gmail.com";
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (!form) return;

  var via = "whatsapp";
  Array.prototype.forEach.call(form.querySelectorAll("button[data-via]"), function (b) {
    b.addEventListener("click", function () { via = b.getAttribute("data-via"); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var business = form.elements.business.value.trim();
    var need = form.elements.need.value;
    var msg = form.elements.message.value.trim();

    if (!name) {
      form.elements.name.setAttribute("aria-invalid", "true");
      form.elements.name.focus();
      note.textContent = "Escribe tu nombre para continuar.";
      note.className = "form-note err";
      return;
    }
    form.elements.name.removeAttribute("aria-invalid");
    note.className = "form-note";

    var lines = ["Hola, soy " + name + "."];
    if (business) lines.push("Mi negocio: " + business + ".");
    lines.push("Necesito: " + need + ".");
    if (msg) lines.push("", msg);
    var text = lines.join("\n");

    if (via === "email") {
      var url = "mailto:" + MAIL + "?subject=" + encodeURIComponent("Consulta de " + name + " (página web)") + "&body=" + encodeURIComponent(text);
      window.location.href = url;
      note.textContent = "Si no se abrió tu correo, escríbenos a " + MAIL + ".";
    } else {
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      note.textContent = "Se abrió WhatsApp con tu mensaje. Solo falta enviarlo.";
    }
  });

  // Copiar correo
  var copy = document.getElementById("copyMail");
  if (copy) {
    copy.addEventListener("click", function () {
      var v = copy.getAttribute("data-copy");
      var done = function () {
        copy.textContent = "Copiado";
        setTimeout(function () { copy.textContent = "Copiar"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(v).then(done, function () {});
      }
    });
  }
})();
