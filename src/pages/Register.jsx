import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRegisterMutation } from "../redux/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

import { toast } from "react-toastify";
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((state) => state.auth);
    useEffect(() => {
        authUser && navigate("/dashboard");
    }, [authUser, navigate]);

    const [register, { isSuccess }] = useRegisterMutation();
    console.log("isSuccess", isSuccess);

    const initialState = {
        username: "",
        email: "",
        password: "",
    };
    const [regUser, setRegUser] = useState(initialState);
    const { username, email, password } = regUser;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegUser((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async () => {
        try {
            const res = await register({ username, email, password }).unwrap();
            console.log("res", res);
            if (res.email) {
                toast.success("New User Successfully Created");
                dispatch(setUser(res));
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className='w-full h-[calc(100vh-64px)] flex justify-center items-start p-3 bg-slate-300'>
            <div className='md:w-2/4  md:mt-16  space-y-4 bg-white py-10 px-5 shadow-md shadow-slate-400 rounded-xl'>
                <div className='flex justify-center items-center'>
                    <h3 className='text-3xl font-semibold'>New User Registration</h3>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3  '>
                    <div className='col-span-1 flex items-end font-semibold border-b'>Username</div>
                    <div className='col-span-2 flex items-center bg-slate-100 px-1 rounded-xl group '>
                        <input
                            type='text'
                            placeholder='Enter Username Here'
                            className=' w-full p-2 rounded-xl bg-slate-100 focus:outline-none  '
                            name='username'
                            value={username}
                            onChange={handleChange}
                        />
                        <FaRegUserCircle size={25} color='#888' />
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                    <div className='col-span-1 flex items-end font-semibold border-b'>
                        Email Address
                    </div>
                    <div className='col-span-2 flex items-center bg-slate-100 px-1 rounded-xl '>
                        <input
                            type='email'
                            placeholder='Enter Email Address Here'
                            className=' w-full p-2 rounded-xl bg-slate-100 focus:outline-none'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                        <MdAlternateEmail size={25} color='#888' />
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3 '>
                    <div className='col-span-1 flex items-end font-semibold border-b'>Password</div>
                    <div className='col-span-2 flex items-center bg-slate-100 px-1 rounded-xl '>
                        <input
                            type='password'
                            placeholder='Enter Password Here'
                            className=' w-full p-2 rounded-xl bg-slate-100 focus:outline-none'
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                        <RiLockPasswordLine size={25} color='#888' />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center '>
                    <button
                        className='w-2/3 bg-slate-500 p-2 rounded-xl text-slate-50 font-semibold'
                        onClick={handleSubmit}>
                        Save
                    </button>
                    <Link to='/login' className='mt-2'>
                        Already Have an Account, Login Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
