export const lowercase = (item) => {
  return Object.keys(item).reduce((acc, k) => {
    const split = k.toLowerCase().split("_");
    const newKey = split.reduce((acc, curr, idx) =>
      idx === 0
        ? (acc += curr)
        : (acc += curr.charAt(0).toUpperCase() + curr.substring(1))
    );
    return { ...acc, [newKey]: item[k] };
  }, {});
};
