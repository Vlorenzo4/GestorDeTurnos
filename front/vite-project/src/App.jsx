import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import NotFound from "./components/NotFound/NotFound";
import styles from "./App.module.css";
import { UsersContext } from "./context/UsersContext";
import AgendarTurno from "./views/AgentarTurno/AgendarTurno";

function App() {
  const { isLogged } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLogged &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.appWrapper}>
      {!isLogged ? (
        <main className={styles.main}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      ) : (
        <>
          <Navbar />

          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agendarturno" element={<AgendarTurno />} />
              <Route path="/misturnos" element={<MisTurnos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
