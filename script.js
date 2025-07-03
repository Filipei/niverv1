const fotos = document.getElementById('fotos');
const total = fotos.children.length;
let index = 0;

const pontosContainer = document.getElementById('pontos');
for (let i = 0; i < total; i++) {
  const ponto = document.createElement('span');
  if (i === 0) ponto.classList.add('ativo');
  pontosContainer.appendChild(ponto);
}

function atualizarCarrossel() {
  fotos.style.transform = `translateX(-${index * 100}%)`;
  [...pontosContainer.children].forEach((p, i) => {
    p.classList.toggle('ativo', i === index);
  });
}


let startX = 0;
fotos.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
fotos.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    index = (index - 1 + total) % total;
  } else if (diff < -50) {
    index = (index + 1) % total;
  }

  atualizarCarrossel();
});

let mouseStartX = 0;
let isDragging = false;

fotos.addEventListener('mousedown', (e) => {
  isDragging = true;
  mouseStartX = e.clientX;
});

fotos.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const diff = e.clientX - mouseStartX;

  if (diff > 50) {
    index = (index - 1 + total) % total;
    atualizarCarrossel();
    isDragging = false;
  } else if (diff < -50) {
    index = (index + 1) % total;
    atualizarCarrossel();
    isDragging = false;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});
setInterval(() => {
  index = (index + 1) % total;
  atualizarCarrossel();
}, 3000);
