import User from '../Models/User';
import config from '../Config';

interface UserMap {
  [uid: string]: User;
}

class Users {

  users: UserMap;

  constructor() {
    this.users = {}
  }

  fetchAll() {
    fetch(`${config.proxyHTTPUrl}/user.list`, {
      method: "GET",
    }).then((resp) => {
      return resp.json();
    }).then((data: any) => {
      data.map((each: any) => {
        this.users[each.id] = new User(each.id, each.name, each.full_name);
      });
    });
  }

  getById(uid: string): User {
    return this.users[uid];
  }

}

const users = new Users();

export default users;