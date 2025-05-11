import { Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./shared/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
