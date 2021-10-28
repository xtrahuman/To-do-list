import Todo from './listclass.js';

const toDoArr = [];
const addList = document.getElementById('add-list');
const addbtn = document.querySelector('.form');
const getLocalStorage = () => (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : toDoArr);
export default function add() {
  addbtn.addEventListener('submit', () => {
    let listInfo;
    if (!addList.validity.valueMissing) {
      listInfo = new Todo(addList.value);
      const storeList = getLocalStorage();
      storeList.push(listInfo);
      localStorage.setItem('todo', JSON.stringify(storeList));
    }
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
