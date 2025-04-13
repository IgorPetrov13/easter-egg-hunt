import { addEggCrackEffect, createFullScreenFireworks } from './explode';

const eggImages = [
    '/images/easter_egg_1.svg',
    '/images/easter_egg_2.svg',
    '/images/easter_egg_3.svg',
    '/images/easter_egg_4.svg',
    '/images/easter_egg_5.svg',
    '/images/easter_egg_6.svg',
];

let brokenEggsCount = 0; 

export function launchEasterEggs(options: { eggImages?: string[], personalMsgage: string, targetEggs?: number } = {personalMsgage: ''} ): void {
  const targetEggs = options.targetEggs || 15; 
  const counter = document.createElement('div');
  counter.className = 'egg-counter';
  counter.innerText = `Broken Eggs: ${brokenEggsCount}/${targetEggs}`;
  document.body.appendChild(counter);

  function updateCounter(): void {
    brokenEggsCount++;
    counter.innerText = `Broken Eggs: ${brokenEggsCount}/${targetEggs}`;
    if (brokenEggsCount === targetEggs) {
      createFullScreenFireworks();
      showFinalMessage();
      clearInterval(intervalId);
    }
  }

  function createEgg(): void {
    const egg = document.createElement('div');
    egg.className = 'egg';

    const size = 40 + Math.random() * 60;
    egg.style.width = `${size}px`;
    egg.style.height = `${size * 1.4}px`;
    egg.style.left = Math.random() * 100 + 'vw';
    egg.style.top = '-60px';
    egg.style.animationDuration = `${3 + Math.random() * 2}s, ${2 + Math.random() * 2}s`;
    egg.style.backgroundImage = `url(${eggImages[Math.floor(Math.random() * eggImages.length)]})`;

    addEggCrackEffect(egg);

    egg.addEventListener('click', (e) => {
      showPopup(e.clientX, e.clientY);
      updateCounter();
      egg.remove();
    });

    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), 6000);
  }

  function showPopup(x: number, y: number): void {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerText = 'Happy Easter!';
    popup.style.left = `${x}px`;
    popup.style.top = `${y - 20}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  }

  function showFinalMessage(): void {
    const message = document.createElement('div');
    message.className = 'final-message';
    message.innerText = options.personalMsgage || 'Happy Easter! Enjoy your weekends :)';
    document.body.appendChild(message);

    // Удаляем сообщение через 7 секунд
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  const intervalId = setInterval(() => {
    if (Math.random() < 0.7) createEgg();
  }, 200);

  setTimeout(() => {
    clearInterval(intervalId);
    counter.remove();
  }, 20000);
}