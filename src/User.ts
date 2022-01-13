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
  id = 0;
  firstName = '';
  middleName? = '';
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

