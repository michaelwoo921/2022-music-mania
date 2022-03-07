import axios from 'axios';
import { User } from './user';

class UserService {
  private URI: string;
  constructor() {
    // URL of the express server
    this.URI = 'http://localhost:5000/api/users';
    // this.URI = 'http://34.216.137.225:3000/users'
  }
  getLogin(): Promise<User> {
    // withCredentials sends our cookies with the request.
    return axios
      .get(this.URI, { withCredentials: true })
      .then((result: any) => {
        console.log(result);
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login(user: User): Promise<User> {
    return axios
      .post(this.URI, user, { withCredentials: true })
      .then((result: any) => result.data);
  }
  logout(): Promise<null> {
    return axios
      .delete(this.URI, { withCredentials: true })
      .then((result: any) => null);
  }

  deleteByUsername(username: string): Promise<null> {
    return axios
      .delete(this.URI + '/' + username, { withCredentials: true })
      .then((result) => console.log(`user: ${username} was deleted.`))
      .catch((err) => err);
  }

  updateUser(user: User): Promise<null> {
    return axios
      .put(this.URI, user, { withCredentials: true })
      .then((result) => null);
  }

  getUsers(): Promise<User[]> {
    return axios
      .get(this.URI, { withCredentials: true })
      .then((result) => result.data)
      .catch((err) => {
        console.error(err);
      });
  }

  //Look here to add user
  addUser(user: User): Promise<null> {
    return axios
      .post(this.URI + '/register', user, { withCredentials: true })
      .then((result: any) => result.data)
      .catch((err) => err);
  }
}

export default new UserService();
