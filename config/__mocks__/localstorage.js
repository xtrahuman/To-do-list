const localStorageMock = (() => {
  const store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value;
      return store[key];
    },
    getAll() {
    },
  };
});

export default localStorageMock;