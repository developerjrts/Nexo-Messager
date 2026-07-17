import { url } from '@/constants/url';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyMail = () => { 
    
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean >()

    const auth_session = searchParams.get("auth_session");

    const verifyMail = async() => {
        setLoading(true)
        try {
            
            const {data} = await axios.post(`${url}/auth/verify-mail?auth_session=${auth_session}`, {}, {
                withCredentials: true
            })

            console.log(data);

            if (data.status) {
                toast.success("Mail verified.")
            }
            navigate("/")
            
        } catch (error) {
            console.log(error); 
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