const fechaInput = document.getElementById("fecha");

const hoy = new Date().toISOString().split("T")[0];

fechaInput.min = hoy;

emailjs.init({
  publicKey: "INTuqw2t1mFosB-8c",
});

const form = document.getElementById("reserva-form");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  mensaje.textContent = "";

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const comensales = parseInt(document.getElementById("comensales").value);

  // Validación básica

  if (!nombre || !telefono || !email || !fecha || !hora || !comensales) {
    mensaje.style.color = "red";
    mensaje.textContent = "Por favor complete todos los campos obligatorios.";

    return;
  }

  // Día de la semana

  const [anio, mes, dia] = fecha.split("-").map(Number);

  const fechaSeleccionada = new Date(anio, mes - 1, dia);

  const diaSemana = fechaSeleccionada.getDay();

  // Lunes cerrado

  if (diaSemana === 1) {
    mensaje.style.color = "red";
    mensaje.textContent = "El restaurante permanece cerrado los lunes.";

    return;
  }

  // Hora a minutos

  const [horas, minutos] = hora.split(":").map(Number);

  const horaEnMinutos = horas * 60 + minutos;

  // Domingo

  if (diaSemana === 0) {
    const apertura = 11 * 60 + 30; // 11:30
    const cierre = 17 * 60 + 30; // 17:30

    if (horaEnMinutos < apertura || horaEnMinutos > cierre) {
      mensaje.style.color = "red";
      mensaje.textContent = "Los domingos las reservas son de 11:30 a 17:30.";

      return;
    }
  }

  // Martes a sábado

  if (diaSemana >= 2 && diaSemana <= 6) {
    const horarioValido =
      horaEnMinutos >= 16 * 60 || // desde 16:00
      horaEnMinutos <= 60; // hasta 01:00

    if (!horarioValido) {
      mensaje.style.color = "red";
      mensaje.textContent =
        "De martes a sábado las reservas son de 16:00 a 01:00.";

      return;
    }
  }

  // Cantidad de comensales

  if (comensales < 1 || comensales > 50) {
    mensaje.style.color = "red";
    mensaje.textContent = "La cantidad de comensales no es válida.";

    return;
  }

  // Fecha y hora pasada

  const fechaHoraReserva = new Date(`${fecha}T${hora}`);

  const ahora = new Date();

  if (fechaHoraReserva < ahora) {
    mensaje.style.color = "red";
    mensaje.textContent = "La fecha y hora seleccionadas ya pasaron.";

    return;
  }

  try {
    await emailjs.sendForm("service_lffnm5l", "template_4n3ik0n", form);

    mensaje.style.color = "green";

    mensaje.textContent =
      "Reserva enviada correctamente. Nos comunicaremos con vos a la brevedad.";

    form.reset();
  } catch (error) {
    console.error("EMAILJS ERROR:", error);

    mensaje.style.color = "red";

    mensaje.textContent = "Ocurrió un error al enviar la reserva.";
  }
});

// Header

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".sitio-header");
  const hamburger = document.querySelector("#hamburger-btn");
  const mobileMenu = document.querySelector("#mobile-menu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  function actualizarMenu() {
    if (window.innerWidth <= 768) {
      hamburger.classList.add("visible");
    } else {
      if (window.scrollY > 100) {
        hamburger.classList.add("visible");
        header.classList.add("hidden");
      } else {
        hamburger.classList.remove("visible");
        header.classList.remove("hidden");
      }
    }
  }

  window.addEventListener("scroll", actualizarMenu);
  window.addEventListener("resize", actualizarMenu);

  actualizarMenu();
});

//Fade up

const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

fadeElements.forEach((element) => {
  observer.observe(element);
});
