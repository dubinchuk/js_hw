// 2. Напишите дженерик функцию generateObject, которая принимает массив пар [string, T] 
//   и возвращает объект, где каждая пара ключ-значение из массива превращается в соответствующую пару ключ-значение в объекте. 
//   В случае если ключи повторяются, значение в объекте должно быть последним из встречающихся.

//   Требования:
//     - Функция должна быть дженерик и работать с любыми типами значений.
//     - Функция должна корректно обрабатывать массив пар, включая случаи, когда ключи повторяются.

//   Пример:
//   const result = generateObject([
//   ["1", 1],
//   ["2", 2],
//   ["3", 3],
//   ["4", 4],
//   ["4", 5], // повторяющийся ключ, значит это значение должно быть в результирующем объекте
// ]);

// console.log(result); //{ '1': 1, '2': 2, '3': 3, '4': 5 }

type PairArray<T> = [string, T][];

function generateObject<T>(array: PairArray<T>): object{
  let result: { [key: string]: T} = {}
  array.forEach(el => result[el[0]] = el[1]);
  return result;
}

const array: PairArray<number> = [
  ["1", 1],
  ["2", 2],
  ["3", 3],
  ["4", 4],
  ["4", 5],
];

console.log(generateObject(array));
