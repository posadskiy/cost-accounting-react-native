const getData = (amounts, todayLimits, limits) => {
  return [{
    data: amounts,
      svg: {stroke: 'lightgreen'},
  },
  {
    data: todayLimits,
    svg: {stroke: 'yellow'},
  },
  {
    data: limits,
    svg: {stroke: 'red'},
  }]
}

const verticalContentInset = {top: 10, bottom: 10};
const xAxisHeight = 30;

export {
  getData,
  verticalContentInset,
  xAxisHeight,
}
