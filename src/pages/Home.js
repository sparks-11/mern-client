import React from 'react'
import Products from '../components/Products'


const Home = () => {
  return (
    <>
      <div className="hero py-16">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/2 pl-2.5">
            <h6 className="text-lg"><em>Looking for pure raw materials ?</em></h6>
            <h1 className="text-3xl md:text-6xl font-bold">Don't wait !</h1>
            <button className="px-6 py-2 rounded-full text-gray-custom font-bold mt-4 bg-deep-blue cursor-pointer hover:bg-logo-blue ease-linear">Order now</button>
          </div>
          <div className="w-1/2">
            <img className="w-4/5 rounded-md" src="/images/pallets.jpg" alt="banner-img"  />
          </div>
        </div>
    </div>
      <div className="pb-24">
        <Products />
      </div>
    </>
  )
}

export default Home
