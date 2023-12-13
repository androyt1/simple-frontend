import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../redux/authSlice";
const Navbar = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(clear());
    };

    const { user } = useSelector((state) => state.auth);
    return (
        <nav className=' h-16 shadow-md '>
            <div className='flex h-full justify-between items-center w-full md:max-w-7xl mx-auto'>
                <div>
                    <Link to='/'>
                        <h3 className='text-2xl font-semibold'>Authentic</h3>
                    </Link>
                </div>
                <ul className='flex items-center space-x-5'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <button
                            onClick={logout}
                            className='ml-6 px-4 py-1 border rounded-xl text-xs font-semibold'>
                            Logout
                        </button>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
