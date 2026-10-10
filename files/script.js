document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".slide");

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const indicatorsContainer = document.querySelector(".carrusel-indicators");

  let currentIndex = 0;

  let interval;

  // Crear indicadores

  slides.forEach((_, index) => {
    const dot = document.createElement("div");

    dot.classList.add("indicador");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = index;
      actualizarCarrusel();
      reiniciarAutoplay();
    });

    indicatorsContainer.appendChild(dot);
  });

  function actualizarCarrusel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    document.querySelectorAll(".indicador").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function siguiente() {
    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    actualizarCarrusel();
  }

  function anterior() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }

    actualizarCarrusel();
  }

  function reiniciarAutoplay() {
    clearInterval(interval);

    interval = setInterval(siguiente, 4000);
  }

  nextBtn.addEventListener("click", () => {
    siguiente();
    reiniciarAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    anterior();
    reiniciarAutoplay();
  });

  actualizarCarrusel();

  interval = setInterval(siguiente, 4000);
});

const header = document.querySelector(".sitio-header");

const hamburger = document.querySelector("#hamburger-btn");

const mobileMenu = document.querySelector("#mobile-menu");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) {
    if (window.scrollY > 100) {
      header.classList.add("hidden");
      hamburger.classList.add("visible");
    } else {
      header.classList.remove("hidden");
      hamburger.classList.remove("visible");
    }
  }
});

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

const CONFETTI_ACTIVADO = false;

if (CONFETTI_ACTIVADO) {
  const container = document.getElementById("confetti-container");

  const colores = [
    "#74ACDF", // celeste argentino
    "#FFFFFF",
    "#74ACDF",
  ];

  const intervalo = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const confetti = document.createElement("div");

      confetti.classList.add("confetti");

      confetti.style.left = Math.random() * 100 + "%";

      confetti.style.backgroundColor =
        colores[Math.floor(Math.random() * colores.length)];

      confetti.style.animationDuration = 4 + Math.random() * 4 + "s";

      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      container.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 8000);
    }
  }, 250);

  setTimeout(() => {
    clearInterval(intervalo);
  }, 15000);
}

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

// REVEAL ON SCROLL

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
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

reveals.forEach((element) => {
  revealObserver.observe(element);
});
