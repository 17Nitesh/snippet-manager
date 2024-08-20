import { Outlet } from "react-router-dom";
import Nav from "./components/nav";
import { ToastContainer } from 'react-toastify';
export default function App() {
  return (
    <>
    <div className=" px-10 md:px-20 md:py-3 bg-nit-100 h-full font-josefin">
      <Nav />
      <main className="">
        <Outlet />
        <ToastContainer />
      </main>
    </div>
    </>
  );
}
