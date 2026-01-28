/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";

export const UsersContext = createContext({
  isLogged: false,
  myApp: [],
  loginUser: () => {},
  logOutUser: () => {},
  registerUser: () => {},
  getUserAppointments: () => {},
  scheduleAppointment: () => {},
  cancelAppointment: () => {},
});

export const UsersProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("user")),
  );
  const [myApp, setMyApp] = useState([]);

  const loginUser = (values) => {
    return axios
      .post(`http://localhost:3000/users/login`, values)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsLogged(response.data.user);
        return response;
      });
  };
  const logOutUser = () => {
    setIsLogged(false);
  };

  const registerUser = (values) => {
    return axios.post(`http://localhost:3000/users/register`, values);
  };

  const getUserAppointments = () => {
    return axios
      .get(`http://localhost:3000/users/${isLogged.id}`)
      .then((response) => {
        setMyApp(response.data.user.appointments);
        return response;
      });
  };

  const scheduleAppointment = (values) => {
    const appData = {
      ...values,
      userId: isLogged.id,
    };
    return axios
      .post(`http://localhost:3000/appointments/schedule`, appData)
      .then((response) => {
        return response;
      });
  };

  const cancelAppointment = (id) => {
    return axios
      .put(`http://localhost:3000/appointments/cancel/${id}`)
      .then(() => {
        const newMyApp = myApp.map((app) => {
          if (app.id === id) {
            app.status = "Cancelled";
            return app;
          } else {
            return app;
          }
        });

        setMyApp(newMyApp);
      });
  };

  const value = {
    isLogged,
    myApp,
    loginUser,
    logOutUser,
    registerUser,
    getUserAppointments,
    scheduleAppointment,
    cancelAppointment,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
