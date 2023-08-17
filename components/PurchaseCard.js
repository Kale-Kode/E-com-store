import Router from 'next/router'
import React from 'react'

export default function PurchaseCard(props) {
  const { price } = props
  console.log(price)

  return (
    <div className='w-60 h-80 shadow-md bg-white flex flex-col items-center justify-evenly gap-3 p-4 border border-solid border-gray-100 cursor-pointer transition hover:opacity-90'>
        {price.product.images && (
          <div className='h-60'>
            <img className='object-cover' src={price.product.images[0]} alt={price.product.name}></img>
          </div>
        )}

        <h1 className='text-md mr-auto font-light uppercase tracking-wide text-left'>{price.product.name}</h1>

        <div className='flex justify-between items-center w-full'>
          <button className='px-2 py-1 text-sm font-md bg-gray-800 text-white transition hover:bg-black' onClick={() => Router.push(`/${price.id}`)}>View</button>
          <p className='text-sm font-extralight text-right opacity-75'>£{price.unit_amount/100}</p> 
        </div>
    </div>
  )
}
