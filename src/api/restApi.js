import axios from 'axios';

window.axios = axios;


class ApiService {
    get = (path) => new Promise((res, rej) => {
      axios.get(`http://localhost:3000/${path}`)
      .then(function (response) {
        res(response.data);
      })
      .catch(function (error) {
        console.log(error);
        rej(error);
      })
      .finally(function () {
        // always executed
      });
    });

    post = (path, payload) => new Promise((res, rej) => {
      axios.post(`http://localhost:3000/${path}`, payload)
      .then(function (response) {
        console.log(response.data);
        res(response.data);
      })
      .catch(function (error) {
        console.log(error);
        rej(error);
      })
      .finally(function () {
        // always executed
      });
    });

    delete = (path, payload) => new Promise((res, rej) => {
        axios.delete(`http://localhost:3000/${path}`, payload)
        .then(function (response) {
          console.log(response.data);
          res(response.data);
        })
        .catch(function (error) {
          console.log(error);
          rej(error);
        })
        .finally(function () {
          // always executed
        });
      });
}

export default new ApiService();