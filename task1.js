function sortingNumber(array) {
  return array.sort((a, b) => {
    const A = a % 2 === 0;
    const B = b % 2 === 0;

    if (A && !B) {
      return -1;
    } else if (!A && B) {
      return 1;
    } else {
      return a - b;
    }
  });
}

const inputArray = [5, 3, 8, 1, 9, 2];
const hasil = sortingNumber(inputArray);

console.log(hasil);
