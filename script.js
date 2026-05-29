const whatsappUrl = "https://wa.me/5515981409671";

const portfolioCases = {
  "Burger Editorial": {
    description: "Campanha com styling de produto, gesto humano e linguagem fashion para transformar o burger em peça de desejo.",
    gallery: [
      "assets/portfolio-01-burger-model.jpg",
      "assets/portfolio-02-stacked-burger.jpg",
      "assets/case-red-burger.jpg"
    ]
  },
  "Stacked Burger": {
    description: "Construção de volume, brilho e frescor para leitura imediata de sabor em fotografia publicitária.",
    gallery: [
      "assets/portfolio-02-stacked-burger.jpg",
      "assets/case-red-burger.jpg",
      "assets/portfolio-10-red-campaign.jpg"
    ]
  },
  "Pizza Moment": {
    description: "Cena lifestyle com direção de mesa, gesto e atmosfera para ativar contexto de consumo.",
    gallery: [
      "assets/portfolio-03-pizza-lifestyle.jpg",
      "assets/case-lifestyle.jpg",
      "assets/portfolio-09-salad-lifestyle.jpg"
    ]
  },
  "Chocolate Miniature": {
    description: "Sobremesa em narrativa lúdica, com escala, brilho e composição de impacto para social e campanha.",
    gallery: [
      "assets/portfolio-04-chocolate-miniature.jpg",
      "assets/case-brownie.jpg",
      "assets/portfolio-08-red-dessert.jpg"
    ]
  },
  "Chocolate Drink": {
    description: "Styling de bebida com calda, textura e finalização de vitrine para marcas de indulgência.",
    gallery: [
      "assets/portfolio-05-chocolate-cup.jpg",
      "assets/case-brownie.jpg",
      "assets/portfolio-04-chocolate-miniature.jpg"
    ]
  },
  "Deu Vassa": {
    description: "Produção de bebida com atmosfera solar, objetos de cena e composição limpa para campanha de marca.",
    gallery: [
      "assets/portfolio-06-beverage-set.jpg",
      "assets/portfolio-05-chocolate-cup.jpg",
      "assets/case-lifestyle.jpg"
    ]
  },
  "Salada Árabe": {
    description: "Conteúdo social com food styling de bowl, cor, frescor e comunicação visual pronta para feed.",
    gallery: [
      "assets/portfolio-07-salad-social.jpg",
      "assets/case-tacos.jpg",
      "assets/portfolio-09-salad-lifestyle.jpg"
    ]
  },
  "Red Dessert": {
    description: "Direção monocromática com forma escultórica, brilho e contraste para uma sobremesa memorável.",
    gallery: [
      "assets/portfolio-08-red-dessert.jpg",
      "assets/case-brownie.jpg",
      "assets/portfolio-04-chocolate-miniature.jpg"
    ]
  },
  "Table Culture": {
    description: "Mesa editorial com mise en scene, produto, mãos e objetos para storytelling gastronômico.",
    gallery: [
      "assets/portfolio-09-salad-lifestyle.jpg",
      "assets/case-lifestyle.jpg",
      "assets/behind-lighting.jpg"
    ]
  },
  "Red Campaign": {
    description: "Campanha em vermelho total, com produto, embalagem e ritmo visual de alto contraste.",
    gallery: [
      "assets/portfolio-10-red-campaign.jpg",
      "assets/case-red-burger.jpg",
      "assets/hero-food-campaign.jpg"
    ]
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const body = document.body;
let lenisInstance = null;

function hasGSAP() {
  return Boolean(window.gsap && window.ScrollTrigger);
}

function initTextSplitting() {
  if (window.Splitting && !prefersReducedMotion) {
    window.Splitting({ target: "[data-splitting]" });
  }
}

function initLenis() {
  if (prefersReducedMotion || !window.Lenis) return;

  lenisInstance = new window.Lenis({
    lerp: 0.075,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    syncTouch: false,
    smoothWheel: true
  });

  if (hasGSAP()) {
    lenisInstance.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    window.gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      lenisInstance.scrollTo(target, {
        duration: 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    });
  });
}

function initGsapExperience() {
  if (prefersReducedMotion || !hasGSAP()) return false;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  body.classList.add("gsap-ready");

  const smoothEase = "power3.out";
  const cinematicEase = "expo.out";

  gsap.set(".hero .eyebrow, .hero-text, .hero-actions", {
    autoAlpha: 0,
    y: 26,
    filter: "blur(8px)"
  });

  if (document.querySelector(".hero-title .char")) {
    gsap.set(".hero-title", { autoAlpha: 1, filter: "blur(0px)", y: 0 });
    gsap.set(".hero-title .char", {
      autoAlpha: 0,
      yPercent: 90,
      filter: "blur(8px)",
      rotateX: -12
    });
  }

  const heroTimeline = gsap.timeline({ paused: true });
  heroTimeline
    .fromTo(".hero-media img", { scale: 1.12 }, { scale: 1.04, duration: 2.2, ease: cinematicEase }, 0)
    .to(".hero .eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: smoothEase }, 0.18)
    .to(".hero-title .char", {
      autoAlpha: 1,
      yPercent: 0,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.05,
      stagger: { amount: 0.48, from: "start" },
      ease: cinematicEase
    }, 0.28)
    .to(".hero-text", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: smoothEase }, 0.9)
    .to(".hero-actions", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: smoothEase }, 1.04);

  const playHero = () => heroTimeline.play();
  window.addEventListener("preloader:done", playHero, { once: true });
  if (!body.classList.contains("preloading")) {
    requestAnimationFrame(playHero);
  }

  document.querySelectorAll(".split-title:not(.hero-title)").forEach((title) => {
    const chars = title.querySelectorAll(".char");
    if (!chars.length) return;

    gsap.set(title, { autoAlpha: 1, filter: "blur(0px)", y: 0 });
    gsap.fromTo(chars, {
      autoAlpha: 0,
      yPercent: 65,
      filter: "blur(8px)"
    }, {
      autoAlpha: 1,
      yPercent: 0,
      filter: "blur(0px)",
      duration: 0.85,
      stagger: { amount: 0.22 },
      ease: cinematicEase,
      scrollTrigger: {
        trigger: title,
        start: "top 82%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".reveal:not(.split-title), .reveal-blur:not(.split-title)").forEach((item) => {
    if (item.closest(".hero")) return;
    if (item.classList.contains("brand-logo")) return;

    gsap.fromTo(item, {
      autoAlpha: 0,
      y: 26,
      filter: item.classList.contains("reveal-blur") ? "blur(8px)" : "blur(0px)"
    }, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.78,
      ease: smoothEase,
      scrollTrigger: {
        trigger: item,
        start: "top 86%",
        once: true
      }
    });
  });

  ScrollTrigger.batch(".brand-logo", {
    start: "top 88%",
    once: true,
    onEnter: (batch) => gsap.to(batch, {
      autoAlpha: 0.9,
      y: 0,
      duration: 0.68,
      stagger: 0.035,
      ease: smoothEase
    })
  });

  gsap.to(".hero-media img", {
    yPercent: 8,
    scale: 1.1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.9
    }
  });

  gsap.utils.toArray("[data-hero-parallax]").forEach((layer) => {
    const depth = Number(layer.dataset.heroParallax || 0.2);
    gsap.to(layer, {
      y: depth * -90,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  });

  gsap.to(".cta-bg img", {
    yPercent: -4,
    scale: 1.07,
    ease: "none",
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2
    }
  });

  gsap.fromTo(".final-cta .cta-glass, .final-cta .contact-panel", {
    autoAlpha: 0,
    y: 28,
    filter: "blur(12px)"
  }, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.9,
    stagger: 0.14,
    ease: smoothEase,
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top 70%",
      once: true
    }
  });

  return true;
}

function initPreloader() {
  const preloader = document.querySelector(".preloader");
  const start = performance.now();
  const minDuration = prefersReducedMotion ? 250 : 1350;

  function hidePreloader() {
    const elapsed = performance.now() - start;
    const delay = Math.max(0, minDuration - elapsed);

    window.setTimeout(() => {
      if (window.gsap && preloader && !prefersReducedMotion) {
        window.gsap.to(preloader, {
          autoAlpha: 0,
          filter: "blur(18px)",
          duration: 0.72,
          ease: "power2.out",
          onComplete: () => {
            preloader.classList.add("is-hidden");
            body.classList.remove("preloading");
            window.dispatchEvent(new Event("preloader:done"));
          }
        });
      } else {
        body.classList.remove("preloading");
        preloader?.classList.add("is-hidden");
        window.dispatchEvent(new Event("preloader:done"));
      }
    }, delay);
  }

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader, { once: true });
  }
}

function initImageLoading() {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    const wrapper = image.parentElement;
    image.setAttribute("data-soft-load", "");

    if (wrapper && !wrapper.classList.contains("preloader-mark")) {
      wrapper.classList.add("image-loading");
    }

    const markLoaded = () => {
      image.classList.add("is-loaded");
      wrapper?.classList.add("image-loaded");
    };

    if (image.complete && image.naturalWidth > 0) {
      requestAnimationFrame(markLoaded);
    } else {
      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", markLoaded, { once: true });
    }
  });
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal, .reveal-blur, [data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.12
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    observer.observe(item);
  });
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (!toggle || !nav) return;

  function animateOpen() {
    if (!hasGSAP() || prefersReducedMotion) return;

    window.gsap.fromTo(nav, {
      autoAlpha: 0,
      filter: "blur(18px)"
    }, {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 0.38,
      ease: "power2.out"
    });

    window.gsap.fromTo(navLinks, {
      autoAlpha: 0,
      y: 18,
      filter: "blur(10px)"
    }, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.62,
      stagger: 0.055,
      ease: "expo.out"
    });
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");

    if (hasGSAP() && !prefersReducedMotion && body.classList.contains("nav-open")) {
      window.gsap.to(navLinks, {
        autoAlpha: 0,
        y: -10,
        duration: 0.22,
        stagger: { each: 0.02, from: "end" },
        ease: "power2.in"
      });
      window.gsap.to(nav, {
        autoAlpha: 0,
        filter: "blur(16px)",
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: () => {
          body.classList.remove("nav-open");
          window.gsap.set(nav, { clearProps: "all" });
          window.gsap.set(navLinks, { clearProps: "all" });
        }
      });
      return;
    }

    body.classList.remove("nav-open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = !body.classList.contains("nav-open");

    if (isOpen) {
      body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      animateOpen();
    } else {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

function initCursor() {
  const cursor = document.querySelector(".custom-cursor");
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!cursor || isTouch) return;

  window.addEventListener("mousemove", (event) => {
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  const interactiveItems = document.querySelectorAll("a, button, .portfolio-button, .service-card, .behind-card, .brand-logo");
  interactiveItems.forEach((item) => {
    item.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    item.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });
}

function initAboutTilt() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const tilt = document.querySelector("[data-tilt] .about-tilt-frame");

  if (!tilt || isTouch || prefersReducedMotion) return;

  tilt.addEventListener("mousemove", (event) => {
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tilt.style.setProperty("--tilt-x", `${y * -8}deg`);
    tilt.style.setProperty("--tilt-y", `${x * 8}deg`);
  });

  tilt.addEventListener("mouseleave", () => {
    tilt.style.setProperty("--tilt-x", "0deg");
    tilt.style.setProperty("--tilt-y", "0deg");
  });
}

function initEditorialTilt() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch || prefersReducedMotion) return;

  const targets = document.querySelectorAll(".portfolio-button, .behind-card");

  targets.forEach((target) => {
    target.addEventListener("mousemove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const strength = target.classList.contains("portfolio-button") ? 3.4 : 4.2;
      target.style.setProperty("--tilt-x", `${y * -strength}deg`);
      target.style.setProperty("--tilt-y", `${x * strength}deg`);
    });

    target.addEventListener("mouseleave", () => {
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function initServiceTilt() {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch || prefersReducedMotion) return;

  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${y * -5.5}deg`);
      card.style.setProperty("--tilt-y", `${x * 5.5}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function initYoutubeEmbed() {
  document.querySelectorAll(".youtube-placeholder").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.youtubeId;
      if (!id) return;

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      iframe.title = "Processo em vídeo - Food Styling";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      button.replaceWith(iframe);
    });
  });
}

function initPortfolioFilters() {
  const chips = document.querySelectorAll(".category-chip");
  const items = document.querySelectorAll(".portfolio-item");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");

      items.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function initPortfolioModal() {
  const modal = document.querySelector(".portfolio-modal");
  const modalImage = document.querySelector(".modal-image");
  const modalTitle = document.querySelector("#modal-title");
  const modalCategory = document.querySelector(".modal-category");
  const modalDescription = document.querySelector(".modal-description");
  const modalDirection = document.querySelector(".modal-direction");
  const modalBehind = document.querySelector(".modal-behind");
  const gallery = document.querySelector(".modal-gallery");
  const closeButton = document.querySelector(".modal-close");
  const portfolioButtons = document.querySelectorAll(".portfolio-button");

  if (!modal || !modalImage || !modalTitle || !gallery) return;

  let lastFocusedElement = null;

  function renderGallery(images, title) {
    gallery.innerHTML = "";

    images.forEach((src, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Ver imagem ${index + 1} de ${title}`);

      const image = document.createElement("img");
      image.src = src;
      image.alt = "";

      button.appendChild(image);
      button.addEventListener("click", () => {
        modalImage.src = src;
      });
      gallery.appendChild(button);
    });
  }

  function openModal(item) {
    const title = item.dataset.title || "Projeto";
    const category = item.dataset.category || "Food Styling";
    const image = item.dataset.image || "assets/portfolio-01-burger-model.jpg";
    const data = portfolioCases[title] || {
      description: "Direção visual gastronômica com acabamento editorial, composição sensorial e foco em marca.",
      gallery: [image]
    };
    const direction = data.direction || `${category} com luz, composição e ritmo visual desenhados para desejo.`;
    const behind = data.behind || "Curadoria de textura, gesto e set para uma imagem pronta para câmera.";

    lastFocusedElement = document.activeElement;
    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalDescription.textContent = data.description;
    if (modalDirection) modalDirection.textContent = direction;
    if (modalBehind) modalBehind.textContent = behind;
    modalImage.src = image;
    modalImage.alt = title;
    renderGallery(data.gallery, title);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");

    if (hasGSAP() && !prefersReducedMotion) {
      const shell = modal.querySelector(".modal-shell");
      window.gsap.killTweensOf([modal, shell]);
      window.gsap.fromTo(modal, {
        autoAlpha: 0,
        backdropFilter: "blur(0px)"
      }, {
        autoAlpha: 1,
        backdropFilter: "blur(22px)",
        duration: 0.42,
        ease: "power2.out"
      });
      window.gsap.fromTo(shell, {
        autoAlpha: 0,
        scale: 0.965,
        y: 18,
        filter: "blur(18px)"
      }, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.58,
        ease: "expo.out"
      });
    }

    closeButton.focus();
  }

  function closeModal() {
    const finishClose = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      body.classList.remove("no-scroll");

      if (window.gsap) {
        window.gsap.set([modal, modal.querySelector(".modal-shell")], { clearProps: "all" });
      }

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };

    if (hasGSAP() && !prefersReducedMotion) {
      const shell = modal.querySelector(".modal-shell");
      window.gsap.killTweensOf([modal, shell]);
      window.gsap.to(shell, {
        autoAlpha: 0,
        scale: 0.975,
        y: 14,
        filter: "blur(14px)",
        duration: 0.28,
        ease: "power2.in"
      });
      window.gsap.to(modal, {
        autoAlpha: 0,
        duration: 0.34,
        ease: "power2.inOut",
        onComplete: finishClose
      });
      return;
    }

    finishClose();
  }

  portfolioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.closest(".portfolio-item"));
    });
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function initParallax() {
  if (prefersReducedMotion) return;

  const heroImage = document.querySelector(".hero-media img");
  const ctaImage = document.querySelector(".cta-bg img");
  const heroTextLayers = document.querySelectorAll("[data-hero-parallax]");
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    if (heroImage) {
      heroImage.style.transform = `scale(1.08) translateY(${scrollY * 0.065}px)`;
    }

    heroTextLayers.forEach((layer) => {
      const depth = Number(layer.dataset.heroParallax || 0.16);
      layer.style.translate = `0 ${scrollY * depth * -0.05}px`;
    });

    if (ctaImage) {
      const rect = ctaImage.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.012;
      ctaImage.style.transform = `scale(1.04) translateY(${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

function hydrateWhatsAppLinks() {
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.href = whatsappUrl;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTextSplitting();
  initPreloader();
  initImageLoading();
  initLenis();
  const gsapEnabled = initGsapExperience();
  hydrateWhatsAppLinks();
  if (!gsapEnabled) {
    initReveal();
  }
  initNavigation();
  initCursor();
  initAboutTilt();
  initServiceTilt();
  initEditorialTilt();
  initPortfolioFilters();
  initYoutubeEmbed();
  initPortfolioModal();
  if (!gsapEnabled) {
    initParallax();
  }
});
