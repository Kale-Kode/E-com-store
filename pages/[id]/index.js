import { useAppContext } from '@/context/CardContext'
import React from 'react'

export async function getServerSideProps(context) {
    const { params } = context
    return {
        props: {
            id: params.id
        }
    }
}

export default function Description(props) {
    const { id: path } = props
    const { state: { prices } = [], dispatch} = useAppContext()
    const product = prices.filter(val => val.id === path.replace('/', ''))[0]
  
    function addToBasket(prod) {
        return () => {
            dispatch({
                type: "add_product",
                value: prod.id
            })
        }
    }

    return (
        <div className='mx-auto w-fit flex flex-wrap justify-center md:gap-6'>
            <img src={product.product.images[0]} alt={product.product.id} style={{ maxHeight: '600px' }} />
            <div className='min-w-min max-w-min whitespace-nowrap'>
                <div className='flex justtify-between items-center'>
                    <h1 className='text-sm py-3 font-light tracking-wide capitalize text-2xl lg:text-3xl '>
                        {product.product.name}
                    </h1>
                    <p className='text-md md:text-xl pl-12'>${product.unit_amount / 100}</p>    
                </div>
                <div className='max-w-full whitespace-normal text-justify pb-4 font-light'>
                    <p className='text-sm md:text-md'>{product.product.description}</p>
                </div>
                <hr/>
                <button onClick={addToBasket(product)} className='w-full my-4 p-4 border border-solid border-gray-100 shadow bg-slate-100 text-slate-700 font-light transition duration-300 hover:opacity-50'>Add to basket</button>
            </div>
        </div>
    )
}
