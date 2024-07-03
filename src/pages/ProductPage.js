import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Grid, Image, Text, Button, Heading, Flex, Center } from "@chakra-ui/react"

import { ShopContext } from '../context/shopContext'
import RichText from '../components/RichText'
import GridSection from '../components/GridSection'

const ProductPage = () => {

  let { handle } = useParams()
  const [gridItems, setGridItems] = useState([])

  const { fetchProductWithHandle, fetchAllProducts, addItemToCheckout, product, products, fetchProducts } = useContext(ShopContext)

  useEffect(() => {
    fetchProductWithHandle(handle)
  }, [fetchProductWithHandle, handle])

  useEffect(() => {
    // fetchAllProducts()
    fetchProducts(2)
    return () => { }
  }, [fetchAllProducts])

  // massage data to feed gridItems
  useEffect(() => {
    const massageData = async () => {
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
    massageData();
    return () => { };
  }, [products])




  if (!product.title) return <div>loading...</div>

  return (
    <>
      <Box className='productpage_container' p="2rem">
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} m="auto">
          <Flex justifyContent="center" alignItems="center">
            <Image src={product.images[0].src} />
          </Flex>
          <Box className='content_container' px="2rem" display="flex" flexDir="column" alignItems="start" justifyContent="start">
            <Heading pb="2rem">{product.title}</Heading>
            <Text fontWeight="bold" pb="2rem">${product.variants[0].price?.amount}</Text>
            <Text color="gray.500" pb="2rem">{product.description}</Text>
            <Button className='default_btn' colorScheme='black' variant='outline' borderRadius='0px' _hover={{ opacity: '70%', background: '#51b0a8', color: 'white' }}
              onClick={() => {
                addItemToCheckout(product?.variants[0]?.id, 1)
              }}>
              Add To Cart
            </Button>
          </Box>
        </Grid>
      </Box>
      <RichText heading="Runway Ready, Gym Fit" />
      <Center fontWeight="bold" pb="2rem">You Might also like</Center>
      {/* <Grid templateColumns={['repeat(1fr)', 'repeat(3, 1fr)']} id="products">
        {products.map(product => (
          <Link to={`/products/${product.handle}`} key={product.id} >
            <Box _hover={{ opacity: '80%' }} textAlign="center" position="relative">
              <Image
                src={product.images[0].src}
              />
              <Text fontWeight="bold" position="absolute" bottom="15%" w="100%">{product.title}</Text>
              <Text position="absolute" bottom="5%" w="100%">${product.variants[0].price?.amount}</Text>
            </Box>
          </Link>
        ))}
      </Grid> */}
      <GridSection gridItems={gridItems} className='single_row' />

    </>
  )
}

export default ProductPage
