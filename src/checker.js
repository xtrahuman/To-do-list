export default function checker(checkList, index, store, addedSection, clearAll) {
  checkList[index].addEventListener('change', () => {
    if (checkList[index].checked) {
      store[index].completed = checkList[index].checked;
      addedSection[index].style.textDecoration = 'line-through';
      localStorage.setItem('todo', JSON.stringify(store));
    } else {
      addedSection[index].style.textDecoration = '';
      clearAll.style.color = '';
      store[index].completed = false;
      localStorage.setItem('todo', JSON.stringify(store));
    }
  });
}
