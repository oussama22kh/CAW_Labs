const { expect, test, describe } = require("@jest/globals");

//*********  01  ************* */

function first(array, n) {
  if (array == null || n <= 0) return [];
  if (n == null) return array[0];
  return array.slice(0, n);
}

test("firt of this arr will return [6,3] ", () => {
  expect(first([6, 3, 20, -5, 0, 8, 10], 2)).toStrictEqual([6, 3]);
});

//*********  02  ************* */

function last(array, n) {
  if (array == null) return [];
  if (n == null) return array[array.length - 1];
  return array.slice(Math.max(array.length - n, 0));
}

test("last of this arr will return [0,8,10] ", () => {
  expect(last([6, 3, 20, -5, 0, 8, 10], 3)).toStrictEqual([0, 8, 10]);
});

//*********  03  ************* */

function conct(arr) {
  return {
    toStringResult: arr.toString(),
    joinResult: arr.join(),
    joinEmptyResult: arr.join(""),
  };
}

test("the output of this func will be ... ", () => {
  expect(conct([6, 3, 20, -5, 0, 8, 10])).toStrictEqual({
    toStringResult: "6,3,20,-5,0,8,10",
    joinResult: "6,3,20,-5,0,8,10",
    joinEmptyResult: "6320-50810",
  });
});

// *********  04  ************* */

function chunk(array, size) {
  var chunkedArr = [];
  var index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
}

test("the outpt of this func will be ...", () => {
  expect(chunk([6, 3, 20, -5, 0, 8, 10], 3)).toStrictEqual([
    [6, 3, 20],
    [-5, 0, 8],
    [10],
  ]);
});
