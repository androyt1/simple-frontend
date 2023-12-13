import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/userApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const { user: authUser } = useSelector((state) => state.auth);
    useEffect(() => {
        authUser && navigate("/dashboard");
    }, [authUser, navigate]);

    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const initialState = {
        email: "",
        password: "",
    };
    const [loginUser, setLoginUser] = useState(initialState);
    const { email, password } = loginUser;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            const res = await login({ email, password }).unwrap();
            if (res.email) {
                toast.success("User login successful");
                navigate("/dashboard");
                dispatch(setUser(res));
            }
        } catch (error) {
            toast.error("Email or password is incorrect first");
        }
    };

    const btnText = isLoading ? "..please wait" : "login";

    return (
        <div className='w-full h-[calc(100vh-64px)] flex justify-center items-start p-3 bg-slate-300'>
            <div className='md:w-2/4  md:mt-16  space-y-4 bg-white py-10 px-5 shadow-md shadow-slate-400 rounded-xl'>
                <div className='flex justify-center items-center'>
                    <h3 className='text-3xl font-semibold'>Login</h3>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-3 '>
                    <div className='col-span-1 flex items-end font-semibold border-b'>
                        Email Address
                    </div>
                    <div className='col-span-2'>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter Email Address Here'
                            className='bg-slate-100 w-full p-2 rounded-xl'
                        />
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3 '>
                    <div className='col-span-1 flex items-end font-semibold border-b'>Password</div>
                    <div className='col-span-2'>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter Password Here'
                            className='bg-slate-100 w-full p-2 rounded-xl'
                        />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center '>
                    <button
                        onClick={handleLogin}
                        className='w-2/3 bg-slate-500 p-2 rounded-xl text-slate-50 font-semibold'>
                        {btnText}
                    </button>
                    <Link to='/register' className='mt-2'>
                        Don't Have an Account, Sign Up Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
