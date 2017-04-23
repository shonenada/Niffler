class User {

  id: string;
  name: string;
  fullname: string;

  constructor(uid: string, name: string, fullname: string) {
    this.id = uid
    this.name = name;
    this.fullname = fullname;
  }
}

export default User;