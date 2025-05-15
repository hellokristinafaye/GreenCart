import React from 'react'
import { assets } from '../assets/assets'

const Categories = () => {
  return (
    <div className="mt-16">
          <p className="text-2xl md:text-3xl font-medium">Categories</p>
          <div className="">
              <div className="">
                  <img src={assets.box_icon} alt="" className="" />
                  <p className="">fruit</p>
              </div>
          </div>
    </div>
  )
}

export default Categories