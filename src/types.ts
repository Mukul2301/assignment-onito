// types.ts

interface CountryOption {
  name: string;
}


export interface User {
  id: string;
  name: string;
  mobile: number;
  age: number;
  sex:string;
  IDType:string
  IDNumber:string
  state?: string
  address?: string
  city?:string
  country:string
  pinCode?: number 

}


export interface RegistrationFormData {
  name: string;
  mobile: number;
  age: number;
  sex:string
  IDType:string
  IDNumber:string
  state?: string
  address?: string
  city?:string
  pinCode?: number 
  country:string

}
