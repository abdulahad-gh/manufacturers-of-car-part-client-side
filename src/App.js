import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import RequireAuth from "./pages/Auth/RequireAuth";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import Purchase from "./pages/Purchase";
import Navbar from "./pages/Shared/Navbar";

function App() {
  return (
    <>
      <Navbar >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="purchase" element={<RequireAuth><Purchase /></RequireAuth>} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Navbar>



    </>
  );
}

export default App;
