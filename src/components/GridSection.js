import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Text, Image } from "@chakra-ui/react"
import { ShopContext } from '../context/shopContext'

function GridSection({ gridItems, className }) {
  return (
    <>
      {
        (gridItems != null) ?
          <Grid className={`grid_section ${className}`} templateColumns={['repeat(1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}>
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
          </Grid> : ''
      }
    </>
  )
}

export default GridSection
