const setItem = require('./index.js');

it('sets data into local storage', () => {
  const jsonId = '222';
  const newJson = { data: 'json data' };
  setItem(jsonId, newJson);
  expect(localStorage.getItem(jsonId)).toEqual(
    JSON.stringify(newJson),
  );
});