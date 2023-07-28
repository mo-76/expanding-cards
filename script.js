// ======================== General funtions ========================
const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

const getFromLocalStorage = (key, defaultValue) => localStorage.getItem(key) || defaultValue;

const removeClass = (elements, className) => {
  const elementList = Array.isArray(elements) ? [...elements] : [elements];
  elementList.forEach(card => card.classList.remove(className));
}

const addClass = (element, className) => element.classList.add(className);

const addElement = (parent, element) => {
  parent.innerHTML = ``;
  parent.innerHTML += element;
  return parent;
}

// ======================== Handle funtions ========================
const appContainerColor = () => {
  return {
    'blue-color': 'blue-gradient',
    'green-color': 'green-gradient',
    'orange-color': 'orange-gradient',
    'gray-color': 'gray-gradient',
  }
}

const handleCardEvent = (card, cards) => {
  if (card.classList.contains('active')) {
    card.classList.remove('active');
    return;
  }
  removeClass(cards, 'active');
  addClass(card, 'active');
}

const handleArrowEvent = (arrow, colors) => {
  if (colors.classList.contains('active')) {
    colors.classList.remove('active');
    addElement(arrow, `<i class="fas fa-angle-double-left"></i>`)
    return;
  }
  colors.classList.add('active');
  addElement(arrow, `<i class="fas fa-angle-double-right"></i>`)
}

const handleColorBoxEvent = (colorBox, colorBoxes, appContainer) => {
  removeClass(colorBoxes, 'active');
  colorBox.classList.add('active');
  appContainer.classList.remove(...Object.values(appContainerColor()));
  appContainer.classList.add(appContainerColor()[colorBox.id]);
  saveToLocalStorage('appContainer-color', appContainerColor()[colorBox.id]);
  saveToLocalStorage('colorBox-id', colorBox.id)
}

// ======================== Event Listener ========================

const getCards = () => [
  document.getElementById('card1'),
  document.getElementById('card2'),
  document.getElementById('card3'),
  document.getElementById('card4'),
  document.getElementById('card5'),
];

const getColorBoxes = () => [
  document.getElementById('blue-color'),
  document.getElementById('green-color'),
  document.getElementById('orange-color'),
  document.getElementById('gray-color'),
]

const arrow = document.getElementById('arrow');
const colors = document.getElementById('colors');
const appContainer = document.getElementById('app');
const colorBoxes = getColorBoxes();

getCards().forEach(card => {
  card.addEventListener('click', () => {
    handleCardEvent(card, getCards());
  })
})

arrow.addEventListener('click', () => {
  handleArrowEvent(arrow, colors);
})


colorBoxes.forEach((colorBox) => {
  colorBox.addEventListener('click', () => {
    console.log(colorBox.id);
    handleColorBoxEvent(colorBox, getColorBoxes(), appContainer)
  })
})

appContainer.classList.add(getFromLocalStorage('appContainer-color', 'blue-gradient'));
document.getElementById(getFromLocalStorage('colorBox-id', 'blue-color')).classList.add('active');

