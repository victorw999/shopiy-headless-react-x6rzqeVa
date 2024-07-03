import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Text, Image } from "@chakra-ui/react"
import { ShopContext } from '../context/shopContext'
import Hero from '../components/Hero'
import RichText from '../components/RichText'
import ImageWithText from '../components/ImageWithText'

const fetchUnsplashImg = async (num) => {
  let key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
  let query = 'yoga'
  let per_page = num
  let color = 'black_and_white'
  let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${key}&per_page=${per_page}&color=${color}`

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data.results;
  } catch (error) {
    console.error('Error:', error);
  }
}

const HomePage = () => {

  // the items to be rendered
  const [gridItems, setGridItems] = useState([])
  const [unsplash, setUnsplash] = useState([])
  const { fetchProducts, products } = useContext(ShopContext)

  useEffect(() => {
    console.log('===> use Effect() fetchProducts only once!')
    fetchProducts(2)
    return () => { };
  }, [])

  useEffect(() => {
    const combineData = async () => {
      try {
        // get # of images frm unsplash
        const unsplashData = await fetchUnsplashImg(10);
        setUnsplash(unsplashData);

        console.log('1 products.length', products.length)
        console.log('useEffect() unsplashData', unsplashData)

        // merging:  inserting one item from each array alternately,

        if (products.length > 0 && unsplashData.length > 0) {
          console.log('2 products.length', products.length)
          // // get data from "products" (shopify API)


          let arr_1 = products.map(product => {
            return {
              id: product.id,
              handle: product.handle,
              title: product.title,
              img: product.images[0].src,
              price: product.variants[0].price?.amount
            }
          })
          let arr_2 = unsplashData.map(i => {
            return {
              id: i.id,
              title: i.alt_description,
              img: i.urls.regular
            }
          })
          let shorterLength = Math.min(arr_1.length, arr_2.length)
          let gridItems = [...arr_1, ...arr_2]
          gridItems = gridItems.flatMap((_, idx) => {
            if (idx <= shorterLength) {
              let pair = [arr_1[idx], arr_2[idx]]
              console.log(`idx: ${idx}, `, pair)
              return pair
            } else {
              return (arr_1[idx] ?? arr_2[idx])
            }
          }).filter(i => i != null)
          console.log(`shorterLength: ${shorterLength} `, 'gridItems', gridItems)
          setGridItems(gridItems)
        }

      } catch (error) {
        console.error('Error:', error);
      }
    };
    combineData();
    return () => { };
  }, [products])




  if (!gridItems) return <div>loading...</div>

  return (

    <Box className='homepage_container'>
      {/* <Hero /> */}
      {/* <RichText heading="The relaxation you’ve been waiting for." text="Our Bath bombs guarantee a fun, relaxing, and colorful night." /> */}

      {/* Curated to global trends, our tech-driven styles open your eyes to the future of fashion. */}
      <RichText heading="The Future of Fashion & Beyond" text="Embrace tomorrow's trends, today. Our meticulously curated collection seamlessly blends cutting-edge fashion technology with the hottest global styles, designed to elevate your look and redefine your expectations." />

      <Grid className="grid_section" templateColumns={['repeat(1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}>
        {gridItems.map(item => (
          <Link className="grid_box_link" to={`/products/${item?.handle ?? ''}`} key={item?.id} >
            <Box className="grid_box_box" _hover={{ opacity: '80%' }} textAlign="center" position="relative">
              <Image
                className="grid_box_img"
                src={item?.img}
              />
              <div className="grid_txt_container">
                <Text className="grid_box_txt product_title focus-in-contract-bck" fontWeight="bold" position="absolute" bottom="10%" w="100%">{item?.title}</Text>
                {/* <Text className="grid_box_txt" color="gray.500" position="absolute" bottom="5%" w="100%">${item?.price}</Text> */}
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
