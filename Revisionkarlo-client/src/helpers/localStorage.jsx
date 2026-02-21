export const setLocalStorage = (key,user) => {
    localStorage.setItem(key,JSON.stringify(user));
}


export const getLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
}