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
