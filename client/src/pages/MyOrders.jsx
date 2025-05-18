import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const { currency } = useAppContext();

    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders);
    } 

    useEffect(() => {
        fetchMyOrders();
    },[])
    
  return (
      <div className="mt-16 pb-16">
          <div className="flex flex-col items-end w-max mb-8">
            <p className="text-2xl font-medium uppercase">My Orders</p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>  
          </div>

          {myOrders.map((order, index) => (
              <div key={index} className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
                  <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
                      <span className="">Order Id: {order._id}</span>
                      <span className="">Payment: {order.paymentType}</span>
                      <span className="">Total Amount: ${currency}{order.amount}</span>
                  </p>
        {/* order details */}
                  {order.items.map((item, index) => (
                      <div className="">
         {/* first col start */}
                          <div className="flex items-center mb-4 md:mb-0">
                              <div className="bg-primary/10 p-4 rounded-lg">
                                  <img src={item.product.image[0]} alt="" className="w-16 h-16" />
                              </div>
         {/* item name and category */}
                            <div className="ml-4">
                                  <h2 className="text-xl font-medium text-gray-800">{item.product.name}</h2>
                                  <p className="">{item.product.category}</p>
                            </div>

                          </div>
         {/* first col end */}

                          <div className="">
                              {/* quantity */}
                              <p className="">Quantity: {item.quantity || "1"}</p>
                              {/* order status */}
                              <p className="">Status: {order.status}</p>
                              {/* date */}
                              <p className="">Date: {new Date(order.createdAt).toLocaleDateString}</p>
                          </div>

                {/* amount */}
                    <p className="">
                              Amount: ${currency}{item.product.offerPrice * item.quantity}
                    </p>

                    </div>
                ))}

            </div>
        ))}    

    </div>
  )
}

export default MyOrders