import { useProfileQuery, useAllUsersQuery } from "../redux/userApiSlice";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { data, isLoading } = useProfileQuery();
    const { data: users, isLoading: loadingUsers } = useAllUsersQuery();

    isLoading && (
        <div>
            <span>Fetching User</span>
        </div>
    );

    const { user } = useSelector((state) => state.auth);

    return (
        <div className='p-5'>
            <h1 className='text-3xl'>Dashboard</h1>
            <div>{!isLoading && <span className='text-xl'>Welcome {user.username}</span>}</div>
            <div>{!isLoading && <span className='text-xl'>Welcome {data.username}</span>}</div>
            <div>
                {!loadingUsers && users?.map((user) => <p key={user?._id}>{user?.username}</p>)}
            </div>
        </div>
    );
};

export default Dashboard;
