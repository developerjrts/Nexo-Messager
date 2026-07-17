import Button from "@/Components/Button"
import TextField from "@/Components/TextField"
import { url } from "@/constants/url"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"

const SignIn = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState<string >("")
    const [password, setPassword] = useState<string >("")


    const handleSignIn = async(): Promise<void> => {

        if (!password||!username) {
            toast.error("All fields are required!");
            return;
        }

        const pendingToast = toast.loading("Signing In...", {autoClose: 500})

        try {  

            const {data} = await axios.post(`${url}/auth/sign-in`, {
                    username,
                    password,
            }, {
                withCredentials: true
            })
            console.log({
                data
            });

            if (data.status) {
                toast.update(pendingToast, {
                    type: "success",
                    isLoading: false,
                    render: data.message,
                    autoClose: 5000
                })
                navigate("/")
            }

            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
            toast.update(pendingToast, {
                type: "error",
                isLoading: false,
                render: error.response?.data.message,
                autoClose: 5000
            })
                console.log(error.response?.data.message);
            }
            
        }
    }

  return (
    <div className="flex w-screen h-screen p-4 md:p-20">
        <div className="w-[100%] flex">
            {/* Boxes */}
            <div className="bg-gray-500/5 hidden w-1/2 rounded-tl-2xl rounded-bl-2xl md:flex flex-col p-10 gap-6 text-center items-center justify-center">
            <h1 className="font-bold text-6xl">Welcome back.</h1>
            <p>The future of high-performance team collaboration is here. Experience clarity in every conversation.</p>
            </div>

            {/* Form */}
            <div className="bg-gray-500/5 flex flex-col gap-4 items-center justify-center text-gray-200 w-full md:w-1/2 rounded-tr-2xl rounded-br-2xl">
           
              <TextField 
              value={username}
              label="username"
              placeholder="Enter username"
               className="w-[100%]"
              onChange={(e) => setUsername(e.target.value)}
              />
              
              <TextField 
              type="password"
              value={password}
              label="password"
              placeholder="Enter password"
              className="w-[100%]"
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button
              onClick={handleSignIn}
              >Sign In</Button>
              </div>
        </div>
    </div>
  )
}

export default SignIn