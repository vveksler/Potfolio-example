// Greeting section parallax
const greetParallax = document.querySelector(".greeting-parallax");
const greetLayers = greetParallax.children;
// Reviews section parallax
const revContParallax = document.querySelector(".rev-cont-parallax");
const revContLayers = revContParallax.children;

let revContTop, delta;

function moveLayers(wScroll, layers) {
  Array.from(layers).forEach(layer => {
    const speedCoeff = layer.dataset.speed;
    const layerOffset = (wScroll * speedCoeff) / 40;

    layer.style.transform = `translateY(-${layerOffset}%)`;
  });
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  const body = document.body;

  const scrollTop = window.pageYOffset || body.scrollTop;
  const scrollLeft = window.pageXOffset || body.scrollLeft;

  const clientTop = body.clientTop || 0;
  const clientLeft = body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

window.addEventListener("scroll", () => {
  if (window.innerWidth >= 768) {
    // Только если ширина экрана больше 768 паралакс будет работать

    revContTop = getCoords(revContParallax).top;
    delta = revContTop - window.innerHeight;

    const wScroll = window.pageYOffset;
    moveLayers(wScroll, greetLayers);

    if (wScroll > delta) {
      const newScroll = wScroll - delta;
      moveLayers(newScroll, revContLayers);
    }
  }
});
