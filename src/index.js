import './style.css';
import checker from './checker.js';
import addList, { addMore } from './addList.js';
import filterTodo, { filterSingle } from './filterTodo.js';

const listed = document.querySelector('.listed');
const clearAll = document.querySelector('.clear-all');
const clearBtn = document.querySelector('.clear-btn');
const toDoArr = [];

const getLocalStorage = () => (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : toDoArr);

function component(store) {
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
  clearBtn.addEventListener('click', () => {
    const newStore = filterTodo(store);
    component(newStore);
  });
  const added = document.querySelectorAll('input[type=text][name=addedlist]');
  const checkList = document.querySelectorAll('input[type=checkbox][name=checklist]');
  const addedSection = document.querySelectorAll('.added-section');
  const deleteIcon = document.querySelectorAll('.fa-trash-o');
  const menuIcon = document.querySelectorAll('.fa-ellipsis-v');
  const delbtn = document.querySelectorAll('.added');
  added.forEach((element, index) => {
    // updates checklist status
    checkList[index].checked = store[index].completed;
    store[index].index = index;
    localStorage.setItem('todo', JSON.stringify(store));
    const linethrough = (index) => {
      if (checkList[index].checked) {
        addedSection[index].style.textDecoration = 'line-through';
      } else {
        addedSection[index].style.textDecoration = '';
      }
    };
    linethrough(index);

    // delete singletask listener
    delbtn[index].addEventListener('click', () => {
      const singleRemoved = filterSingle(store, index);
      component(singleRemoved);
    });
    // checks the focus and blur status of task input
    element.addEventListener('focus', () => {
      document.querySelectorAll('.align-list')[index].style.backgroundColor = '#ECE883';
      addedSection[index].style.textDecoration = '';
      element.style.backgroundColor = '#ECE883';
      checkList[index].style.backgroundColor = '#ECE883';
      checkList[index].style.color = 'red';
      deleteIcon[index].classList.add('show');
      menuIcon[index].classList.add('unshow');
    });
    element.addEventListener('blur', () => {
      document.querySelectorAll('.align-list')[index].style.backgroundColor = '';
      element.style.backgroundColor = '';
      checkList[index].style.backgroundColor = '';
      deleteIcon[index].classList.remove('show');
      menuIcon[index].classList.remove('unshow');
      // observe checker to update linethrough feature
      if (checkList[index].checked) {
        addedSection[index].style.textDecoration = 'line-through';
      }
    });

    element.addEventListener('change', () => {
      const edited = addMore(element, store, index);
      component(edited);
    });

    // checks and convert task to complete
    checker(checkList, index, store, addedSection, clearAll);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  addList();
  component(getLocalStorage());
});
