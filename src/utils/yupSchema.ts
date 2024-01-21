import * as yup from "yup";

export const yupSchema = yup.object().shape({
    name: yup.string().required('Name is Required').min(3, 'Name must be at least 3 characters long'),
    mobile: yup
      .number()
      .required('Mobile is Required')
      .integer('Please enter a valid number')
      .typeError('Please enter a valid number')
      .test('len', 'Must be a 10-digit number', val => String(val).length === 10),
    age: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Age is Required"),
    sex: yup.string().required("Select an option"),

    IDType: yup
    .string()
    .required("Select an option"),
   
    IDNumber: yup
      .string()
      .matches(/^[2-9]\d*$/, 'Number should not start with 0 or 1')
      .test(
        'len',
        `ID Number must have appropiate characters`,
        function (value) {
          const { IDType } = this.parent;
          const min = IDType === 'Aadhar' ? 12 : 10;
          return !value || value.length === min;
        }
      )
      .required('ID Number is Required'),
    city: yup.string(),
    state: yup.string(),
    address: yup.string(),
    country: yup.string().required("Country is required"),
  });