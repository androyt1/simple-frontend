import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Private from "./components/Private";

const App = () => {
    return (
        <>
            <Navbar />
            <div className='w-full md:max-w-7xl mx-auto'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route element={<Private />}>
                        <Route path='dashboard' element={<Dashboard />} />
                    </Route>
                </Routes>
                <ToastContainer />
            </div>
        </>
    );
};

export default App;
