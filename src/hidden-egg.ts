import { addExplodeEffect } from "./explode";

const egg2 = '/images/hidden_egg.svg';

export function attachHiddenEgg(triggerCallback: () => void = () => { }): void {

  const triggerCB = () => {
    triggerCallback();    
    clearInterval(showIntervalId);
    hideEgg();
  };

  window.addEventListener('scroll', handleScroll);
  
  function showEggFromRandomEdge(): void {
    const elements = document.querySelectorAll('body *');
    const visibleElements = Array.from(elements).filter(
      (element) => element instanceof HTMLElement && isShowbleInViewport(element)
    ) as HTMLElement[];

    if (visibleElements.length > 0) {
      const randomElement = visibleElements[Math.floor(Math.random() * visibleElements.length)];
      showEggByElement(randomElement);
    }
    setTimeout(hideEgg, 1500);
  }

  function showEggByElement(element: HTMLElement): void {
    const egg = document.createElement('div');
    egg.className = 'hidden-egg ';
    addExplodeEffect(egg);
    egg.style.backgroundImage = `url(${egg2})`;

    const rect = element.getBoundingClientRect();

    let randomX: number;
    let randomY: number;

    randomX = rect.left + Math.random() * rect.width;
    randomY = rect.top + (Math.random() > 0.5 ? rect.height : 0);

    egg.style.left = `${randomX}px`;
    egg.style.top = `${randomY}px`;

    document.body.appendChild(egg);

    egg.addEventListener('click', triggerCB);
  }

  function hideEgg(): void {
    const egg = document.getElementsByClassName('hidden-egg')[0] as HTMLElement;
    if (egg) {
      egg.removeEventListener('click', triggerCB);
      egg.remove();
    }
  }

  function handleScroll(): void {
    hideEgg();
  }


  showEggFromRandomEdge();
  const showIntervalId = setInterval(() => {
    showEggFromRandomEdge();
  }, 5000);

  function isShowbleInViewport(element: HTMLElement): boolean {
    const elementStyle = window.getComputedStyle(element);
    if (
      elementStyle.height === '0px' ||
      elementStyle.display === 'none' ||
      elementStyle.opacity === '0' ||
      elementStyle.visibility === 'hidden' ||
      elementStyle.clipPath === 'circle(0px at 50% 50%)' ||
      elementStyle.transform === 'scale(0)' ||
      element.offsetWidth < 100 ||
      element.offsetHeight < 20 ||
      element.hasAttribute('hidden')
    ) {
      return false;
    }

    const parentElement = element.parentElement;
    if (!!parentElement) {
      const parentStyle = window.getComputedStyle(parentElement);
      if (
        !elementStyle.backgroundColor ||
        !parentStyle.backgroundColor ||
        elementStyle.backgroundColor === 'rgba(0, 0, 0, 0)' ||
        elementStyle.backgroundColor === parentStyle.backgroundColor
      ) {
        return false;
      }
    }

    const rect = element.getBoundingClientRect();

    const baseElementLeft = rect.left;
    const baseElementTop = rect.top;

    const elementFromStartingPoint = document.elementFromPoint(baseElementLeft, baseElementTop);

    if (elementFromStartingPoint != null && !element.isSameNode(elementFromStartingPoint)) {
      const elementZIndex = elementStyle.zIndex;
      const elementOverlappingZIndex = window.getComputedStyle(elementFromStartingPoint).zIndex;

      if (Number(elementZIndex) < Number(elementOverlappingZIndex)) {
        return false;
      }

      if (elementZIndex === '' && elementOverlappingZIndex === '') {
        if (element.compareDocumentPosition(elementFromStartingPoint) & Node.DOCUMENT_POSITION_FOLLOWING) {
          return false;
        }
      }
    }

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
