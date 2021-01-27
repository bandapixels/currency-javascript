const bubbleSort = (arr, field) => {
  for (let i = 0, endI = arr.length - 1; i < endI; i++) {
    let wasSwap = false;

    for (let j = 0, endJ = endI - i; j < endJ; j++) {
      const currVal = field ? arr[j][field] : arr[j];
      const nextVal = field ? arr[j + 1][field] : arr[j + 1];

      if (currVal < nextVal) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        wasSwap = true;
      }
    }

    if (!wasSwap) break;
  }

  return arr;
};

module.exports = bubbleSort;
