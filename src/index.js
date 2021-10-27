import './style.css';

const listed = document.querySelector('.listed');
const clearAll = document.querySelector('.clear-all');
const ToDo = [{
  description: 'my first task',
  completed: false,
  index: 0,
},
{
  description: 'my second task',
  completed: false,
  index: 1,
},
{
  description: 'my third task',
  completed: false,
  index: 2,
},
{
  description: 'my fourth task',
  completed: false,
  index: 3,
},
];

function component() {
  const listArr = ToDo.map((i) => `
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
    checkList[index].addEventListener('change', () => {
      if (checkList[index].checked) {
        addedSection[index].style.textDecoration = 'line-through';
      } else {
        addedSection[index].style.textDecoration = '';
        clearAll.style.color = '';
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', component);