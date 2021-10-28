export default function filterTodo(todo) {
  const newArr = todo.filter((status) => status.completed === false);
  localStorage.setItem('todo', JSON.stringify(newArr));
  return newArr;
}

export function filterSingle(store, index) {
  store.splice(index, 1);
  localStorage.setItem('todo', JSON.stringify(store));
  return store;
}