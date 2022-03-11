export class User {
  _id: string = '';
  firstName?: string = '';
  lastName?: string = '';
  email?: string = '';
  active?: boolean = false;
  password: string = '';
  accessToken?: string = '';
  confirmationCode: string = '';
  role?: string = '';
}
