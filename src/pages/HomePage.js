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
  const NUM_OF_UNSPLASH = 10

  useEffect(() => {
    fetchProducts(2) // get products frm lululemon collection
    return () => { };
  }, [])

  useEffect(() => {
    const combineData = async () => {
      try {
        // get # of images frm unsplash
        const unsplashData = await fetchUnsplashImg(NUM_OF_UNSPLASH);


        // merging:  inserting one item from each array alternately,
        if (products.length > 0 && unsplashData.length > 0) {

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
          setUnsplash(arr_2);
          let shorterLength = Math.min(arr_1.length, arr_2.length)
          let gridItems = [...arr_1, ...arr_2]
          gridItems = gridItems.flatMap((_, idx) => {
            if (idx < shorterLength) {
              let pair = [arr_1[idx], arr_2[idx]]
              return pair
            } else {
              // return (arr_1[idx] ?? arr_2[idx]) // stops at 8 unsplash img
            }
          }).filter(i => i != null)
          // console.log(`shorterLength: ${shorterLength} `, 'gridItems', gridItems)
          console.log('unsplash: ', unsplash)
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
      <RichText heading="Treat yourself!" text="The cherry blossom whispers its beauty, reminding us to savor the fleeting moments of life. In the stillness of the meditation hall, a single breath becomes a vast ocean of awareness." />
      <ImageWithText
        button
        image={unsplash[unsplash.length - 1]?.img}
        heading="Mahayana"
        text="Through practices like meditation and mindfulness, Zen encourages us to let go of distractions and connect with the present moment. " />
      <ImageWithText
        reverse
        button
        image={unsplash[unsplash.length - 2]?.img}
        heading="A Journey"
        text="The path to Zen is a journey, not a destination. Embrace the quiet moments, be present in your daily activities." />


      <RichText addImg='/zen.png' className='white_bg' heading="" text="The mind, like the wind, is ever in motion. Yet, beneath the surface ripples, a deep well of stillness remains. Through meditation, we can learn to quiet the chatter and access this stillness. In this present moment, where the past has faded and the future is yet to be, lies true peace." />
    </Box>
  )
}

export default HomePage
