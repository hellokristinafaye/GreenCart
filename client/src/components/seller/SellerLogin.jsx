import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post('/api/seller/login', { email, password });
            if (data.success) {
                // toast("hello")
                setIsSeller(true);
                // // isSeller(true);
                navigate('/seller');
                //This seems to be the prob. Like the data goes thru according to Postman, but the page can't get to /seller, or something isn't right w/ /seller???
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    useEffect(() => {
        if (isSeller) {
            navigate('/seller');
        }
    }, [isSeller]);

    // this is what displays if the seller IS NOT logged in
  return !isSeller && (
      <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()} action="" className="min-h-screen flex items-center text-sm text-gray-600">
          
          <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
              <p className="text-2xl font-medium m-auto"><span className="text-primary">Seller</span> Login</p>
{/* email input */}
              <div className="w-full">
                  <p className="">Email</p>
                  <input onChange={(e)=> setEmail(e.target.value)} value={email}
                      type="email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" placeholder="Enter your email" required />
              </div>
{/* password input */}
              <div className="w-full">
                  <p className="">Password</p>
                  <input onChange={(e)=> setPassword(e.target.value)} value={password}
                      type="password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" placeholder="Enter your password" required />
              </div>

            {/* added the onClick, but not sure if necessary */}
              <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">Log In</button>

          </div>
          
    </form>
  )
}

export default SellerLogin