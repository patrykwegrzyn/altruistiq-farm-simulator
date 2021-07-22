
const uuid4 = require("uuid4");

class DB {
  constructor() {
    this.data = []
  }
  set(arr) {
    this.data = arr.map( row => {
      const id = uuid4();
      return {...row, id}
    })
  }
  add(obj) {
    const id = uuid4();
    this.data.push({...obj, id})
  }
  get() {
    return this.data;
  }
}


module.exports = {
  farms : new DB(),
  purchases: new DB()
}