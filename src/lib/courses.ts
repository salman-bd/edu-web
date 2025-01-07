import { courseListSchema } from '@/app/lib/schema'
import { stripe } from '@/app/lib/stripe'
import Stripe from 'stripe'

export async function getCourses(
  options: Pick<Stripe.ProductListParams, 'limit'> = {
    limit: 6,
  }
) {
  const products = await stripe.products.list({
    limit: options.limit,
    active: true,
    expand: ['data.default_price'],
  })

  return courseListSchema.parse({
    data: products.data.map(product => {
      const price = product.default_price as Stripe.Price
      const amount = price.unit_amount ? price.unit_amount / 100 : null

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        category: product.metadata.category || 'Uncategorized',
        duration: product.metadata.duration || 'Self-paced',
        price: {
          id: price.id,
          amount,
          display_amount: amount?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
        },
      }
    }),
    has_more: products.has_more,
    starting_after: products.data[products.data.length - 1]?.id,
  })
}

