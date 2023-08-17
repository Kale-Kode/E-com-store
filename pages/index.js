import Image from 'next/image'
import Head from 'next/head'
import Router from 'next/router'
import Stripe from 'stripe'
import PurchaseCard from '@/components/PurchaseCard'
import { useAppContext } from '@/context/CardContext'
import { useEffect } from 'react'

export async function getServerSideProps(context) {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2022-11-15'
  })

  const res = await stripe.prices.list({
    limit: 10,
    expand: ['data.product']
  })

  const prices = res.data.filter(price => price.active)

  return {
    props: { prices }
  }
}

export default function Home({ prices }) {
  console.log(prices)
  const {state, dispatch} = useAppContext()

  useEffect(() => {
    dispatch({
      type: "set_prices",
      value: prices
    })
  }, [prices])

  return (
    <div className='flex-1 py-12 sm:max-w-2/3 flex flex-wrap justify-center gap-20'>
      <Head>
      <title>Ecom Store</title>
      </Head>

      {prices.map((price, i) => {
        return <PurchaseCard key={i} price={price} />
      })}
    </div>
  )
}
