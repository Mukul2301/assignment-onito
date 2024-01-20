import * as yup from "yup";

export const yupSchema = yup.object().shape({
    country: yup.string().required("Country is required"),
    name: yup.string().required("First Name is required"),
    mobile: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Mobile is Required"),
    age: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Age is Required"),
    IDType: yup
      .string()
      .required("Govt Issued ID Type select Oneof [“Aadhar”, “PAN”]"),
    sex: yup.string().required("sex select Oneof [Male, Female]"),
    IDNumber: yup
      .string()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("ID Number is Required"),
    city: yup.string(),
    state: yup.string(),
    address: yup.string(),
    // pinCode: yup.number().nullable(),
  });