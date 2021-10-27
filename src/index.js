import './style.css';
import checker from './checker.js';

const listed = document.querySelector('.listed');
const clearAll = document.querySelector('.clear-all');
const toDo = [{
  description: 'my first task',
  completed: false,
  index: 1,
},
{
  description: 'my second task',
  completed: false,
  index: 2,
},
{
  description: 'my third task',
  completed: false,
  index: 3,
},
{
  description: 'my fourth task',
  completed: false,
  index: 4,
},
];

const getLocalStorage = () => (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : toDo);

const component = (store) => {
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
  const added = document.querySelectorAll('input[type=text][name=addedlist]');
  const checkList = document.querySelectorAll('input[type=checkbox][name=checklist]');
  const addedSection = document.querySelectorAll('.added-section');
  const deleteIcon = document.querySelectorAll('.fa-trash-o');
  const menuIcon = document.querySelectorAll('.fa-ellipsis-v');
  added.forEach((element, index) => {
    checkList[index].checked = store[index].completed;

    const linethrough = (index) => {
      if (checkList[index].checked) {
        addedSection[index].style.textDecoration = 'line-through';
      } else {
        addedSection[index].style.textDecoration = '';
      }
    };
    linethrough(index);
    element.addEventListener('focus', () => {
      document.querySelectorAll('.align-list')[index].style.backgroundColor = '#ECE883';
      element.style.backgroundColor = '#ECE883';
      checkList[index].style.backgroundColor = '#ECE883';
      deleteIcon[index].classList.add('show');
      menuIcon[index].classList.add('unshow');
    });
    element.addEventListener('blur', () => {
      document.querySelectorAll('.align-list')[index].style.backgroundColor = '';
      element.style.backgroundColor = '';
      checkList[index].style.backgroundColor = '';
      deleteIcon[index].classList.remove('show');
      menuIcon[index].classList.remove('unshow');
    });
    checker(checkList, index, store, addedSection, clearAll);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const storeList = getLocalStorage();
  component(storeList);

  localStorage.setItem('todo', JSON.stringify(storeList));
});
