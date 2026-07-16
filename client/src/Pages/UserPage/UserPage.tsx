import Button from "@/Components/Button"
import { type IUser } from "@/Types/index"
import { url } from "@/constants/url"
import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const UserPage = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState<IUser >()
 
    const {username} = useParams()

    const getUser = async(): Promise<void> => {
        try {
            const {data} = await axios.get(`${url}/user/${username}`, {
                withCredentials: true
            })

            console.log(data);

            if (data.status) {
            setUser(data.user)
            }
            

        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                console.log(error.response?.data);
                toast.error(error.response?.data.message)
            }
        }
    }

    const createConversation = async(): Promise<void> => {
        const pendingToast = toast.loading("Creating Conversation...", {
            isLoading: true,
            autoClose: 5000,
        })
        try {
            
            const {data} = await axios.post(`${url}/conversation/create`, {
                receiverId: user?._id
            }, {
                withCredentials: true
            })

            console.log(data);
            
            toast.update(pendingToast, {
                isLoading: false,
                type: "success",
                render: data.message,
                autoClose: 5000
            })

            navigate(`/chat/${data.conversation._id}`)


        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message)
            }
            
        }
    }

    useEffect(() => {
        getUser()
    }, [username])

    if (!user) {
        return (
            <div className="flex h-screen flex-col gap-2 items-center justify-center">
                <h1 className="text-2xl font-semibold">User not found</h1>
                <Button
                >
                    <Link to={"/"}>Home</Link>
                </Button>
            </div> 
        )
    }

  return (
    <div className="h-screen flex items-center justify-center">
        <div className="bg-gray-500/5 items-center justify-center flex flex-col gap-4 shadow-sm rounded-md p-6">
        <img src={user?.avatar} className="w-20 h-20 rounded-full" />
       <div className="flex gap-6 flex-col">
       <div>
         <p>Name</p>
         <h1 className="text-2xl font-semibold">{user?.name}</h1>
       </div>
     <div>
           <p>Username</p>
        <h1 className="text-gl font-semibold text-gray-400">@{user?.username}</h1>
     </div>
       <div>
         <p>Bio</p>
        <h1 className="text-gl font-semibold text-gray-400">{user?.bio || "I'm Nexo Messanger user"}</h1>
       </div>
       </div>
       <Button
       onClick={() => createConversation()}
       >Message</Button>
       {user?.username === username && <a href={`mailto:${user?.email}`}>{user?.email}</a>}
        </div>
    </div>
  )
}

export default UserPage