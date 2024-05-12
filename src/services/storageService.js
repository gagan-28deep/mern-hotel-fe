import ls from "localstorage-slim";

export const getStorage = (key) => {
  // console.log("getStorage: ", key);
  return ls.get(key, { decrypt: true });
};

export const removeStorage = (key) => {
  // console.log("removeStorage: ", key);
  ls.remove(key);
};

export const setStorage = (key, value) => {
  // console.log("setStorage: ", `${key}: ${value}`);
  ls.set(key, value);
};

export default getStorage;
