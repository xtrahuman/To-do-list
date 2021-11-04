import localStorage from './store.js';
import Todo from './listclass.js';

Object.defineProperty(window, 'localStorage', { value: localStorage });

const getLocalStorage = () => (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []);
const addfn = () => {
  const listInfo = new Todo('my first task');
  const storeList = getLocalStorage();
  storeList.push(listInfo);
  localStorage.setItem('todo', JSON.stringify(storeList));
};

function component(store) {
  document.body.innerHTML = `<div>
    <ul class="listed list-unstyled">
  
    </ul>
  </div>`;
  const listed = document.querySelector('.listed');
  const listArr = store.map((i) => `
       <li class="d-flex align-list">
           <label for="checklist"></label>
           <input type='checkbox' name="checklist">
           <label for="addedlist"></label>
           <input type="text" id="added-list" name="addedlist" class="added-section" placeholder='${i.description}' value='${i.description}' required>
           <div class="button-flex">
               <button type="submit" class="btn added"><i class="fa fa-ellipsis-v"></i><i class="fa fa-trash-o"></i></button>
           </div>
       </li>`);
  listed.innerHTML = listArr.join('');
  const checkList = document.querySelectorAll('.align-list');
  return checkList;
}

function filterSingle(store, index) {
  store.splice(index, 1);
  localStorage.setItem('todo', JSON.stringify(store));
  return store;
}
export { addfn as default, component, filterSingle };