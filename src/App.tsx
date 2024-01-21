import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import "datatables.net-dt/css/jquery.dataTables.css";
import StepperComponent from "./components/Stepper";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StepperComponent />
    </Provider>
  );
};

export default App;
