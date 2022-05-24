import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import RequireAuth from "./pages/Auth/RequireAuth";
import Signup from "./pages/Auth/Signup";
import AddReview from "./pages/Dashboard/User/AddReview";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/User/MyOrders";
import MyProfile from "./pages/Dashboard/MyProfile";
import Payment from "./pages/Dashboard/User/Payment";
import Home from "./pages/Home/Home";
import Purchase from "./pages/Purchase";
import Navbar from "./pages/Shared/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <Navbar >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<RequireAuth>< Dashboard /> </RequireAuth>}>
            <Route index element={<MyProfile />}></Route>
            <Route path="myOrders" element={<MyOrders />}></Route>
            <Route path="payment/:orderId" element={<Payment />}></Route>
            <Route path="addReview" element={<AddReview />}></Route>
          </Route>
          <Route path="purchase/:id" element={<RequireAuth><Purchase /></RequireAuth>} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Navbar>
      <ToastContainer />



    </>
  );
}

export default App;
