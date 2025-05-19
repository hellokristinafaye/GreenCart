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
          
          <div className="">
              
          </div>
          
    </form>
  )
}

export default SellerLogin