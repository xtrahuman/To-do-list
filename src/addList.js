import addfn from './addfn.js';

const addbtn = document.querySelector('.form');
export default function add() {
  addbtn.addEventListener('submit', () => {
    addfn();
  });
}

export function addMore(added, store, index) {
  if (!added.validity.valueMissing) {
    store[index].description = added.value;
    localStorage.setItem('todo', JSON.stringify(store));
    return store;
  }
  if (added.validity.valueMissing) {
    store.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(store));
    return store;
  }
  return store;
}
