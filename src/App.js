import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Shared/Navbar";

function App() {
  return (
    <>
      <Navbar >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Navbar>



    </>
  );
}

export default App;
