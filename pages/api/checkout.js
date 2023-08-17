import Stripe from "stripe"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'POST message required'})
  }

  const body = JSON.parse(req.body)
  if (body.line_items.length === 0) {
    return req.status(405).json({message: 'Please select items for checkout'})
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
      apiVersion: '2022-11-15'
    })

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: body.line_items,
      mode: 'payment'
    })

    res.status(201).json({ session })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
