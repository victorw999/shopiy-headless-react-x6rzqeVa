import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Text, Image } from "@chakra-ui/react"
import { ShopContext } from '../context/shopContext'

const ProductList = () => {

  // the items to be rendered
  const [gridItems, setGridItems] = useState([])
  const { fetchProducts, products } = useContext(ShopContext)

  useEffect(() => {
    fetchProducts(2)
    return () => { };
  }, [])

  useEffect(() => {
    const combineData = async () => {
      try {
        if (products.length > 0) {
          let arr_1 = products.map(product => {
            return {
              id: product.id,
              handle: product.handle,
              title: product.title,
              img: product.images[0].src,
              price: product.variants[0].price?.amount
            }
          })
          setGridItems(arr_1)
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

    <Box className='productlist_container'>

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

    </Box>
  )
}

export default ProductList
