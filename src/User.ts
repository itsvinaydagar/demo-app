import moment from 'moment';

export enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Subscriber = "Subscriber",
}

export interface IUser {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: number;
  role: Role;
  address?: string;
  createdOn?: Date;
  modifiedOn?: Date;
}

export default class User implements IUser{
  constructor({firstName, middleName = '', lastName = '', email, phone = undefined, role, address = '', createdOn = new Date(), modifiedOn = new Date()} : IUser) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.address = address
    this.createdOn = createdOn;
    this.modifiedOn = modifiedOn;
  }
  firstName = '';
  middleName = '';
  email = '';
  role = Role.Admin;
  lastName = '';
  phone: number | undefined = undefined;
  address = '';
  createdOn = new Date();
  modifiedOn = new Date();

  @dateFormatter()
  static formateDate(date: Date) {
    return date;
  }
}

function dateFormatter() {
  return  function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function(arg: any) {
      arg = moment(arg).format('DD MMM, YY - hh:mm A')
      return method.call(this, arg);
    }
  };
}

