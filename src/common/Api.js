import axios from 'axios';

// axios.get('http://localhost:3001/ldb.json', { params: options })
//   .then(({ data: { data, meta } }) => {
//     this.setState({ data, meta })
//   }).catch((err) => {});

export default class Api {
  static get(options = {}) {
    return axios.get('http://localhost:3001/ldb.json', options)
  }
}
