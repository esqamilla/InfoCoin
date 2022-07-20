export const rublesWithTwoZero = (money: number) => {
  const num = money.toFixed(2)
  const convertedNum = num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
  return `${convertedNum} ₽`
};