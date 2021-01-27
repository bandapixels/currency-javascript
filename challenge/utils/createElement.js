// create element and add content into it
const createElement = (elementName = 'div', children) => {
  const element = document.createElement(elementName);

  if ((typeof children === 'string' || typeof children === 'number') && !Number.isNaN(children)) {
    element.innerHTML = children;
  }

  if (Array.isArray(children)) {
    children.forEach(item => element.append(item));
  }

  return element;
};

module.exports = createElement;
