import mojs from '@mojs/core';

export function addExplodeEffect(btn: HTMLElement): void {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    new mojs.Burst({
      left: 0,
      top: 0,
      x,
      y,
      radius: { 0: 70 },
      count: 12,
      children: {
        shape: 'circle',
        fill: 'white',
        radius: 5,
        duration: 700,
        easing: 'cubic.out',
      },
    }).play();
  });
}

export function addEggCrackEffect(btn: HTMLElement): void {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxRadius = Math.min(rect.width, rect.height) / 2;

    new mojs.Burst({
      left: 0,
      top: 0,
      x,
      y,
      radius: { 0: maxRadius * 2 },
      count: 10,
      children: {
        shape: 'polygon',
        points: 6,
        fill: { '#F4A261': '#E76F51' },
        radius: { 10: maxRadius / 2 },
        angle: { 0: 360 },
        rotate: { 0: 360 },
        duration: 1500,
        easing: 'cubic.out',
      },
    }).play();

    new mojs.Shape({
      left: 0,
      top: 0,
      x,
      y,
      shape: 'circle',
      fill: '#F4D35E',
      radius: { 0: maxRadius * 0.4 },
      duration: 1000,
      easing: 'cubic.out',
    }).play();

    new mojs.Shape({
      left: 0,
      top: 0,
      x,
      y,
      shape: 'circle',
      fill: 'rgba(255, 255, 255, 0.8)',
      radius: { 0: maxRadius },
      duration: 1200,
      easing: 'cubic.out',
    }).play();
  });
}

export function createFullScreenFireworks(): void {
  const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845', '#28B463'];

  document.body.style.overflow = 'hidden';

  function createBurst(x: number, y: number): void {
    new mojs.Burst({
      left: 0,
      top: 0,
      x,
      y,
      radius: { 50: 400 },
      count: 20,
      children: {
        shape: 'circle',
        fill: colors[Math.floor(Math.random() * colors.length)],
        radius: { 10: 20 },
        duration: 1500,
        easing: 'cubic.out',
      },
      onComplete: function () {
        this.el.parentNode?.removeChild(this.el);
      },
    }).play();

    new mojs.Burst({
      left: 0,
      top: 0,
      x,
      y,
      radius: { 30: 200 },
      count: 12,
      children: {
        shape: 'polygon',
        points: 5,
        fill: colors[Math.floor(Math.random() * colors.length)],
        radius: { 8: 15 },
        duration: 2000,
        easing: 'cubic.out',
      },
      onComplete: function () {
        this.el.parentNode?.removeChild(this.el);
      },
    }).play();

    new mojs.Burst({
      left: 0,
      top: 0,
      x,
      y,
      radius: { 50: 250 },
      count: 15,
      children: {
        shape: 'rect',
        fill: colors[Math.floor(Math.random() * colors.length)],
        radius: { 5: 15 },
        duration: 2000,
        angle: { 0: 360 },
        easing: 'cubic.out',
      },
      onComplete: function () {
        this.el.parentNode?.removeChild(this.el);
      },
    }).play();
  }

  function createFirework(): void {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createBurst(x, y);
  }

  const intervalId = setInterval(() => {
    createFirework();
    createFirework();
  }, 300);

  setTimeout(() => {
    clearInterval(intervalId);
    document.body.style.overflow = '';
  }, 7000);
}