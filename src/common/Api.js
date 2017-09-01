import axios from 'axios';

export default class Api {
  static get(options = {}) {
    return axios.get('http://localhost:3001/ldb.json', options)
  }
}
