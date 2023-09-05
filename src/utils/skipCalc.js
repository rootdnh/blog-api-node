export const skipCalc = (limit, page) => {
  let skip = limit * (page - 1);
  
  return {
    offset: skip,
    limit: limit
  }
}