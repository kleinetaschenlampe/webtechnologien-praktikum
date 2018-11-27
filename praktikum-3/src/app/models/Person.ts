export class Person {
  public name: string;
  public picturePath: string;
  public birthdate: string;
  public bornIn: string;
  public profession: string;
  public password: string;
  public username: string;

  public constructor(name: string, path: string, birthdate: string, bornIn: string,
    profession: string, password: string, username: string) {
    this.name = name;
    this.picturePath = path;
    this.birthdate = birthdate;
    this.bornIn = bornIn;
    this.profession = profession;
    this.password = password;
    this.username = username;
  }
}
