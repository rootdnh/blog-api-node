export const skipCalc = (limit, page) => {
  return new Promise((resolve, reject)=>{
    if(limit <= 0 || page <= 0) reject(new Error("Limit and page must be greater than zero"))
    let skip = limit * (page - 1);
    let result = {
      offset: skip,
      limit: limit
      }

    resolve (result)
  })
}