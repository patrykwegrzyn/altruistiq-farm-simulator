
import { v4 as uuid4 } from 'uuid'

class DB {
  data: any[]
  constructor() {
    this.data = []
  }
  set(arr: any[]) {
    this.data = arr.map( row => {
      const id = uuid4();
      return {...row, id}
    })
  }
  add(obj:any) {
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
