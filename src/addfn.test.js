import addfn, {
  component, filterSingle, checker, filterTodo, addMore,
} from './addfn.js';
import localStorage from './store.js';

const getLocalStorage = () => (localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []);
describe('check mocked local storage', () => {
  test('check added to local storage', () => {
    addfn();
    expect(getLocalStorage()).toHaveLength(1);
  });

  test('check add another to local storage', () => {
    addfn();
    expect(getLocalStorage()).toHaveLength(2);
  });
});

describe('checking the storage', () => {
  test('check completed status', () => {
    checker(component(getLocalStorage()), 1, getLocalStorage());
    expect(getLocalStorage()[1].completed).toBeTruthy();
  });

  test('checking the completed status', () => {
    expect(getLocalStorage()[0].completed).toBeFalsy();
  });

  test('delete the completed status', () => {
    expect(filterTodo(getLocalStorage())).toHaveLength(1);
  });
});

describe('checking the dom', () => {
  test('check add in dom', () => {
    addfn();
    expect(component(getLocalStorage())).toHaveLength(2);
  });

  test('check remove in dom', () => {
    filterSingle(getLocalStorage(), 1);
    expect(component(getLocalStorage())).toHaveLength(1);
  });
});

describe('checking the description in storage', () => {
  const index = [0];
  test('check old description', () => {
    expect(getLocalStorage()[index].description).toBe('my first task');
  });
  test('check updated description', () => {
    addMore('changed todo list', getLocalStorage(), index);
    expect(getLocalStorage()[index].description).toBe('changed todo list');
  });
});
