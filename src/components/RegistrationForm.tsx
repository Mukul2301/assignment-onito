// RegistrationForm.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/userSlice";
import { RootState } from "../features/store";
import { RegistrationFormData } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { yupSchema } from "../yupSchema";
import "../table.css";

interface CountryOption {
  label: string;
  value: string;
}

interface FormValues {
  country: string;
}

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const IDs = ["PAN", "Aadhar"];
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

  const validateFields = async () => {
    // Trigger field validation manually
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
    // Assuming you generate the user id on the client side
    const user = { id: String(Date.now()), ...data };
    dispatch(addUser(user));
    console.log(user);
    // Clear form after submission
    reset();
    setStep(0);
  };

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const currentTableRef = tableRef.current;

    if (currentTableRef) {
      // Destroy the existing DataTable instance (if any)
      $(currentTableRef).DataTable().destroy();

      // Create a new DataTable instance
      const dataTable = $(currentTableRef).DataTable({
        // Your DataTable options here
        columns: [
          { title: "Column 1" },
          { title: "Column 2" },
          { title: "Column 3" },
          { title: "Column 4" },
          { title: "Column 5" },
          { title: "Column 6" },
          { title: "Column 7" },
          { title: "Column 8" },
        ],
        // Add more columns based on your user data
      });

      // Clear existing rows
      dataTable.clear();

      users.forEach((user) => {
        dataTable.row.add([
          user.id,
          user.name,
          user.id,
          user.name,
          user.id,
          user.name,
          user.id,
          user.name,
          // Add more columns based on your user data
        ]);
      });

      // Draw the updated DataTable
      dataTable.draw();

      // Example: Destroy the DataTable when the component unmounts
      return () => {
        dataTable.destroy();
      };
    }
  }, [users]);

  console.log(users);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stepper activeStep={step} alternativeLabel>
            <Step>
              <StepLabel>Personal Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Address Details</StepLabel>
            </Step>
          </Stepper>

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
                    <InputLabel>Name</InputLabel>
                    <TextField
                      fullWidth
                      placeholder="Enter Name"
                      {...register("name", { required: true })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel>Date of Birth or Age</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        // label=""
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
                      style={{ paddingBottom: "3px" }}
                      id="dropdown-placeholder"
                    >
                      Sex
                    </InputLabel>
                    <FormControl fullWidth>
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
                    <InputLabel>Mobile</InputLabel>
                    <TextField
                      style={{ width: "350px" }}
                      placeholder="Enter Mobile"
                      {...register("mobile", { required: true })}
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel>Govt Issued ID</InputLabel>
                    <FormControl fullWidth>
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
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <InputLabel>A </InputLabel>
                    <TextField
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
              <div>
                <TextField
                  label="Address"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  size="small"
                />
                <TextField
                  label="City"
                  {...register("city")}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  size="small"
                />
                <TextField
                  label="state"
                  {...register("state")}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  size="small"
                />
                {/* <AutoCompleteCountrySelector /> */}
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onInputChange={handleInputChange}
                  onChange={(_, newValue) =>
                    setValue("country", newValue?.value ?? "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      size="small"
                    />
                  )}
                />
                <TextField
                  label="Pin Code"
                  {...register("pinCode")}
                  error={!!errors.pinCode}
                  helperText={errors.pinCode?.message}
                  size="small"
                />
              </div>
              <div>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setStep(0)}
                >
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </>
          )}

          {/* Display User Records in Table */}
          {/* <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>ID Type</TableCell>
              <TableCell>ID Number</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.sex}</TableCell>
                <TableCell>{user.IDType}</TableCell>
                <TableCell>{user.IDNumber}</TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
        </form>
      </div>
      <div>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Sex</th>
              <th>ID Type</th>
              <th>ID Number</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.age}</td>
                <td>{user.sex}</td>
                <td>{user.IDType}</td>
                <td>{user.IDNumber}</td>
                <td>{user.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegistrationForm;
