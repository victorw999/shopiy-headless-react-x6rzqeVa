import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Text, Image } from "@chakra-ui/react"
import { ShopContext } from '../context/shopContext'
import Hero from '../components/Hero'
import RichText from '../components/RichText'
import ImageWithText from '../components/ImageWithText'


const HomePage = () => {

  const { fetchAllProducts, products } = useContext(ShopContext)

  useEffect(() => {
    fetchAllProducts()

    return () => {

    }
  }, [fetchAllProducts])


  if (!products) return <div>loading...</div>

  return (

    <Box className='homepage_container'>
      {/* <Hero /> */}
      {/* <RichText heading="The relaxation you’ve been waiting for." text="Our Bath bombs guarantee a fun, relaxing, and colorful night." /> */}

      {/* Curated to global trends, our tech-driven styles open your eyes to the future of fashion. */}
      <RichText heading="The Future of Fashion & Beyond" text="Embrace tomorrow's trends, today. Our meticulously curated collection seamlessly blends cutting-edge fashion technology with the hottest global styles, designed to elevate your look and redefine your expectations." />

      <Grid className="grid_section" templateColumns={['repeat(1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}>
        {products.map(product => (
          <Link className="grid_box_link" to={`/products/${product.handle}`} key={product.id} >
            <Box className="grid_box_box" _hover={{ opacity: '80%' }} textAlign="center" position="relative">
              <Image
                className="grid_box_img"
                src={product.images[0].src}
              />
              <div className="grid_txt_container">
                <Text className="grid_box_txt product_title focus-in-contract-bck" fontWeight="bold" position="absolute" bottom="10%" w="100%">{product.title}</Text>
                {/* <Text className="grid_box_txt" color="gray.500" position="absolute" bottom="5%" w="100%">${product.variants[0].price?.amount}</Text> */}
              </div>
            </Box>
          </Link>
        ))}
      </Grid>
      <RichText heading="Treat yourself!" />
      <ImageWithText
        button
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/premium-bath-bombs.jpg?v=1610066758"
        heading="Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. " />
      <ImageWithText
        reverse
        button
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/bath-bomb-and-candle.jpg?v=1610066758"
        heading="Second Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. " />
    </Box>
  )
}

export default HomePage
