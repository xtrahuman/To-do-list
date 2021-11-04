import addfn, { component, filterSingle } from './addfn.js';
import localStorage from './store.js';

Object.defineProperty(window, 'localStorage', { value: localStorage });
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
describe('checking the dom', () => {
  test('check add in dom', () => {
    addfn();
    expect(component(getLocalStorage())).toHaveLength(3);
  });

  test('check remove in dom', () => {
    filterSingle(getLocalStorage(), 1);
    expect(component(getLocalStorage())).toHaveLength(2);
  });
});
