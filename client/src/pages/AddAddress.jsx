import React from 'react'
import { assets } from '../assets/assets'

// Input Field Component
const inputField = (() => (
    <input type="text" className="" />
))

const AddAddress = () => {
  return (
    <div className="mt-16 pb-16">
          <p className="text-2xl md:text-3xl text-gray-500">Add Shipping <span className="font-semibold text-primary">Address</span></p>
          <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
              <div className=""></div>
              <img src={assets.add_address_iamge} alt="Add Address" className="" />
          </div>
    </div>
  )
}

export default AddAddress