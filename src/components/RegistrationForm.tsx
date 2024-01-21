import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, setUsers } from "../features/userSlice";
import { RootState } from "../features/store";
import { RegistrationFormData } from "../utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { yupSchema } from "../utils/yupSchema";
import "./styles/style.css";
import Table from "./DataTable";
import { toast } from "react-toastify";

interface CountryOption {
  label: string;
  value: string;
}

interface FormValues {
  country: string;
}

const RegistrationForm: React.FC<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ step, setStep }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    setValue,
  } = useForm<RegistrationFormData>({
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") ?? "[]");
    dispatch(setUsers(storedUsers));
  }, [dispatch]);

  const validateFields = async () => {
    const isValid = await trigger([
      "name",
      "mobile",
      "age",
      "IDNumber",
      "sex",
      "IDType",
    ]);

    if (isValid) {
      setStep(1);
    }
  };

  const [options, setOptions] = useState<CountryOption[]>([]);

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${inputValue}`
      );

      const countries: CountryOption[] = response.data.map((country: any) => ({
        label: country.name.common,
        value: country.name.common,
      }));

      setOptions(countries);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: string
  ) => {
    if (reason === "input") {
      clearErrors("country");
      loadOptions(value);
    }
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    const user = { id: String(Date.now()), ...data };
    dispatch(addUser(user));
    const storedUsers = JSON.parse(localStorage.getItem("users") ?? "[]");
    localStorage.setItem("users", JSON.stringify([...storedUsers, user]));
    toast.success("Record Saved!");

    reset();
    setStep(0);
  };

  const handleDelete = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);

    dispatch(deleteUser(userId));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Record Deleted!");
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1 */}
          {step === 0 && (
            <>
              <div>
                <h3
                  style={{ textDecoration: "underline", fontStyle: "italic" }}
                >
                  Personal Details
                </h3>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel
                      style={{
                        display: "inline-block",
                        width: "70px",
                        textAlign: "left",
                        top: "7px",
                      }}
                    >
                      Name
                    </InputLabel>
                    <TextField
                      placeholder="Enter Name"
                      {...register("name", { required: true })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel
                      style={{
                        display: "inline-block",
                        width: "120px",
                        textAlign: "left",
                        top: "2px",
                      }}
                    >
                      Date of Birth <br />
                      or Age
                    </InputLabel>
                    <FormControl style={{ width: "350px" }}>
                      <TextField
                        placeholder="DD/MM/YYYY or Age in Years"
                        {...register("age")}
                        type="number"
                        error={!!errors.age}
                        helperText={errors.age?.message}
                        size="small"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel
                      style={{
                        paddingBottom: "3px",
                        display: "inline-block",
                        width: "60px",
                        textAlign: "left",
                        top: "4px",
                      }}
                      id="dropdown-placeholder"
                    >
                      Sex
                    </InputLabel>
                    <FormControl style={{ width: "160px" }}>
                      <InputLabel
                        style={{ top: "-8px" }}
                        id="dropdown-placeholder"
                      >
                        Enter Sex
                      </InputLabel>
                      <Select
                        {...(register("sex"), { required: true })}
                        labelId="dropdown-placeholder"
                        label="Enter Sex"
                        size="small"
                        defaultValue=""
                        {...register("sex")}
                        error={!!errors.sex}
                      >
                        <MenuItem value="Male">Male </MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                      {!!errors.sex && (
                        <FormHelperText error>
                          {errors.sex.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel
                      style={{
                        paddingBottom: "3px",
                        display: "inline-block",
                        width: "60px",
                        textAlign: "left",
                        top: "6px",
                      }}
                    >
                      Mobile
                    </InputLabel>
                    <TextField
                      style={{ width: "350px", right: "-7px" }}
                      placeholder="Enter Mobile"
                      {...register("mobile", { required: true })}
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    <InputLabel
                      style={{
                        paddingBottom: "3px",
                        display: "inline-block",
                        width: "120px",
                        textAlign: "left",
                        top: "6px",
                      }}
                    >
                      Govt Issued <br /> ID
                    </InputLabel>
                    <FormControl
                      style={{ width: "160px", paddingRight: "20px" }}
                    >
                      <InputLabel style={{ top: "-8px" }}>ID Type</InputLabel>
                      <Select
                        {...register("IDType", { required: true })}
                        size="small"
                        label="ID Type"
                        placeholder="Enter Govt ID"
                        defaultValue=""
                        {...register("IDType")}
                        error={!!errors.IDType}
                      >
                        <MenuItem value="PAN">PAN </MenuItem>
                        <MenuItem value="Aadhar">Aadhar</MenuItem>
                      </Select>
                      {!!errors.IDType && (
                        <FormHelperText error>
                          {errors.IDType.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <TextField
                      style={{
                        paddingBottom: "3px",
                        display: "inline-block",
                        width: "650px",
                        textAlign: "left",
                      }}
                      placeholder="Enter Govt ID"
                      {...register("IDNumber")}
                      type="number"
                      error={!!errors.IDNumber}
                      helperText={errors.IDNumber?.message}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </div>

              <div>
                <Button
                  style={{ marginLeft: "16px" }}
                  onClick={validateFields}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <>
              <h3
                style={{
                  marginLeft: "16px",
                  textDecoration: "underline",
                  fontStyle: "italic",
                }}
              >
                Address Details
              </h3>

              <Grid container spacing={2} padding={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    style={{
                      paddingBottom: "3px",
                      display: "inline-block",
                      width: "60px",
                      textAlign: "left",
                      top: "6px",
                      paddingRight: "20px",
                    }}
                  >
                    Address
                  </InputLabel>
                  <TextField
                    placeholder="Enter Address"
                    style={{ width: "350px" }}
                    label="Address"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    style={{
                      paddingBottom: "3px",
                      display: "inline-block",
                      width: "60px",
                      textAlign: "left",
                      top: "6px",
                    }}
                  >
                    State
                  </InputLabel>
                  <TextField
                    placeholder="Enter State"
                    style={{ width: "300px" }}
                    label="State"
                    {...register("state")}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    style={{
                      paddingBottom: "3px",
                      display: "inline-block",
                      width: "60px",
                      textAlign: "left",
                      top: "6px",
                    }}
                  >
                    City
                  </InputLabel>
                  <TextField
                    style={{ width: "300px" }}
                    label="City"
                    placeholder="Enter city/town/village"
                    {...register("city")}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl style={{ width: "260px" }}>
                    <InputLabel
                      style={{
                        paddingBottom: "3px",
                        display: "inline-block",
                        textAlign: "left",
                        top: "-10px",
                        left: "-16px",
                      }}
                    >
                      Country
                    </InputLabel>
                    <Autocomplete
                      style={{
                        paddingLeft: "20px",
                      }}
                      options={options}
                      getOptionLabel={(option) => option.label}
                      onInputChange={handleInputChange}
                      onChange={(_, newValue) =>
                        setValue("country", newValue?.value ?? "")
                      }
                      renderInput={(params) => (
                        <TextField
                          style={{
                            left: "60px",
                          }}
                          {...params}
                          label="Country"
                          error={!!errors.country}
                          helperText={errors.country?.message}
                          size="small"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel
                    style={{
                      paddingBottom: "3px",
                      display: "inline-block",
                      width: "100px",
                      textAlign: "left",
                      top: "6px",
                    }}
                  >
                    Pin Code
                  </InputLabel>
                  <TextField
                    placeholder="Enter pincode"
                    label="Pin Code"
                    {...register("pinCode")}
                    error={!!errors.pinCode}
                    helperText={errors.pinCode?.message}
                    size="small"
                  />
                </Grid>
              </Grid>
              <div>
                <Button
                  style={{ margin: "20px" }}
                  type="button"
                  variant="contained"
                  onClick={() => setStep(0)}
                >
                  Back
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </div>
            </>
          )}
        </form>
      </div>

      <div style={{ paddingTop: "40px" }}>
        <Table users={users} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default RegistrationForm;
