import { url } from '@/constants/url';
import type { IUser } from '@/Types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState<IUser []>([])

    const getUsers = async() => {
        try {
            const {data} = await axios.get(`${url}/user/get/users`, {
                withCredentials: true
            })

            console.log(data);
            setUsers(data.users)

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

  return (
    <div className='h-screen flex p-4 overflow-scroll justify-center items-center'>
        {
            users.map((user, i) => {
                return (
                     <Link
                     key={i}
                        to={`/user/${user.username}`}
                        className={`shadow w-full md:w-[40%] bg-gray-500/5 cursor-pointer gap-2 hover:bg-blue-600/50 transition-all flex items-center rounded-xl p-3`}>
                        <img
                        src={user?.avatar}
                        className="rounded-full w-10 h-10"
                        />
                        <div>
                            <h1 className="font-bold text-lg">{user?.name}</h1>
                            <h1>@{user?.username}</h1>
                        </div>
                        </Link> 
                )
            })
        }
    </div>
  )
}

export default Users