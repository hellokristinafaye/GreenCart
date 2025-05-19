import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate } = useAppContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsSeller(true);
    }

    useEffect(() => {
        if (isSeller) {
            navigate('/seller');
        }
    }, [isSeller]);

    // this is what displays if the seller IS NOT logged in
  return !isSeller && (
      <form onSubmit={onSubmitHandler} action="" className="min-h-screen flex items-center text-sm text-gray-600">
          
          <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
              <p className="text-2xl font-medium m-auto"><span className="text-primary">Seller</span> Login</p>
{/* email input */}
              <div className="w-full">
                  <p className="">Email</p>
                  <input type="email" className="" placeholder="Enter your email"/>
              </div>
{/* password input */}
              <div className="w-full">
                  <p className="">Password</p>
                  <input type="password" className="" placeholder="Enter your password"/>
              </div>

          </div>
          
    </form>
  )
}

export default SellerLogin