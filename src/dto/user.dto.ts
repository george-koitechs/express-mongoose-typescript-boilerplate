interface IUserDTO {
  email: string;
  id: string;
  isActivated: boolean;
}
export class UserDTO {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: IUserDTO) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }
}
