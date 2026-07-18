import { url } from '@/constants/url';
import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyMail = () => { 
    
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean >()

    const verification_token = searchParams.get("verification_token");

    const verifyMail = async() => {
        const pendingToast = toast.loading("Verifying verification token")
        try {
            
            const {data} = await axios.post(`${url}/auth/verify-email?verification_token=${verification_token}`, {}, {
                withCredentials: true
            })

            console.log(data);

            if (data.status) {
                toast.update(pendingToast, {
                    isLoading: false,
                    type: "success",
                    render: "Account Verified."
                })
            }
            navigate("/")
            
        } catch (error) {
            if (isAxiosError(error)) {
                toast.update(pendingToast, {
                    type: "error",
                    isLoading: false,
                    render: error.response?.data.message
                })
            }
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        verifyMail()
    }, [])

  return (
    <div className='h-screen w-screen flex items-center justify-center'>

        {
            loading && (
                <div>
                    <h1 className='text-2xl'>Verifying you mail...</h1>
                </div>
            )
        }
    </div>
  )
}

export default VerifyMail