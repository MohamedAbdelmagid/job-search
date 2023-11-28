const getNextElement = (list, currentElement) => {
  const nextIndex = list.indexOf(currentElement);
  return list[(nextIndex + 1) % list.length];
};

export default getNextElement;
