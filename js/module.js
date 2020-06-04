const productdb = (dbname, table) => {
  //create db

  const db = new Dexie(dbname)
  db.version(1).stores(table)
  db.open()
  return db
}

//insert function
const bulkcreate = (dbtable, data) => {
  let flag = empty(data)

  if (flag) {
    dbtable.bulkAdd([data])
    console.log('data inserted successfuly')
  } else {
    console.log('please provide data')
  }
  return flag
}

//check textbox validation
const empty = (object) => {
  let flag = false

  for (const value in object) {
    if (object[value] !== '' && object.hasOwnProperty(value)) {
      flag = true
    } else {
      flag = false
    }
  }
  return flag
}

//get data from db
const getData = (dbtable, fn) => {
  let index = 0
  let obj = {}

  dbtable.count((count) => {
    if (count) {
      dbtable.each((table) => {
        obj = sortObj(table)
        fn(obj, index++)
      })
    } else {
      fn(0)
    }
  })
}

//sort object
const sortObj = (sortobj) => {
  let obj = {}
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    seller: sortobj.seller,
    price: sortobj.price,
  }
  return obj
}

//create dynamic elemments
const createElem = (tagName, appendTo, fn) => {
  const element = document.createElement(tagName)
  if (appendTo) appendTo.appendChild(element)
  if (fn) fn(element)
}

export default productdb
export { bulkcreate, getData, createElem }
