const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

const setItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export default { getItem, setItem };
