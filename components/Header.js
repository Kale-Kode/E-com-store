import { useAppContext } from '@/context/CardContext'
import Router from 'next/router'
import React, { useState, useRef } from 'react'

export default function Header() {
  const { state, dispatch } = useAppContext()
  const [ basketDisplay, setBasketDisplay ] = useState(false)
  const modalRef = useRef()

  async function checkout() {
    const line_items = Object.keys(state.products).map((id, i) => {
      return {
        price: id,
        quantity: state.products[id]
      }
    })
    // const line_items = [{
    //   price: prices[0].id,
    //   quantity: 1
    // }]

    const res = await fetch('api/checkout', {
      method: 'POST',
      body: JSON.stringify({ line_items })
    })

    const data = await res.json()
    console.log(data)
    Router.push(data.session.url)
  }

  function increment(id, count){
    return () => dispatch({
      type: "vary_count",
      value: [id, count+1]
    })
  }

  function decrement(id, count){
    if (count > 1) {
      return () => dispatch({
        type: "vary_count",
        value: [id, count-1]
      })
    }
  }

  return (
    <div className='shadow-lg py-8 flex justify-center items-center sticky top-0 bg-white relative'>
      {
        basketDisplay && <div ref={modalRef} className='absolute bg-white shadow border border-gray-200 border-solid z-50 top-0 h-screen w-screen sm:w-80 right-0 flex flex-col gap-2 px-2'>
          <div className='overflow-auto flex-1'>
              <div className='flex justify-between items-center'>
                  <h1 className='text-2xl py-4 pl-2'>CART</h1>
                  <div className='ml-auto w-fit p-2 cursor-pointer select-none transition duration-300 opacity-50' onClick={() => setBasketDisplay(!basketDisplay)}>╳</div>
              </div>
              <hr className='py-2' />
              {
                Object.keys(state.products).map((productID, i) => {
                  const productQuantity = state.products[productID]
                  const product = state.prices.find(price => price.id === productID)
                  
                  return <div className='border-l border-solid border-gray-100 text-sm  p-4 flex flex-col gap-4 relative' key={i}>
                    <div className='flex items-center justify-between'>
                      <p className='truncate'>{product.product.name}</p>
                      <p>${product.unit_amount / 100}</p>
                    </div>

                    <div className='font-extralight flex justify-between items-center'>
                      <h1>QUANTITY: <span className='pl-4 border border-solid py-1 pr-6 border-gray-400 ml-3 relative'>
                          {productQuantity}
                          <div className='absolute top-0 right-0 h-full w-3 flex flex-col '>
                              <div className='leading-none scale-75 cursor-pointer' onClick={increment(productID, productQuantity)}>
                                  <i className="fa-solid fa-chevron-up"></i>
                              </div>
                              <div className='leading-none scale-75 cursor-pointer' onClick={decrement(productID, productQuantity)}>
                                  <i className="fa-solid fa-chevron-down"></i>
                              </div>
                          </div>
                      </span>
                      </h1>
                    </div>
                  </div>
                })
              }

          </div>
          <button onClick={checkout} className=' m-1 shadow bg-black text-white font-light text-sm py-2 transition duration-300 hover:opacity-50 select-none'>CHECKOUT</button>
        </div>
      }
        <h1 className='font-bold uppercase flex-1 text-center cursor-pointer select-none transition hover:opacity-50 duration-300' onClick={() => Router.push('/')}>
            Kai's Klothes
        </h1>

        <div className='absolute right-0' onClick={() => setBasketDisplay(!basketDisplay)}>
            <i className="fa-solid fa-bag-shopping px-2 py-2 text-xl sm:text-3xl mr-4 transition hover:opacity-60 duration-300 cursor-pointer"></i>
        </div>
    </div>
  )
}
