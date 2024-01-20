// App.tsx
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RegistrationForm from "./components/RegistrationForm";
import userReducer from "./features/userSlice";
import "datatables.net-dt/css/jquery.dataTables.css";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RegistrationForm />
    </Provider>
  );
};

export default App;
