import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

import { Badge, Box, Icon, Image } from "@chakra-ui/react"
import { MdShoppingBasket, MdDehaze } from "react-icons/md";


const Navbar = () => {

  const { openCart, openMenu, checkout } = useContext(ShopContext)

  return (
    <Box className='navbar_container' borderBottom="0.25pt white solid" backgroundColor="white" display="flex" flexDir="row" p="2rem" justifyContent="space-between" alignItems="center">
      <Icon fill="black" cursor="pointer" onClick={() => openMenu()} as={MdDehaze} w={30} h={30}></Icon>
      <Link to="/"><Image src="https://cdn.shopify.com/s/files/1/0183/5968/1124/files/itsukushima-shrine.png?v=1719792277" w={66} h={66} /></Link>
      <Box>
        <Icon fill="black" cursor="pointer" onClick={() => openCart()} as={MdShoppingBasket} w={30} h={30}></Icon>
        <Badge backgroundColor="white" borderRadius="50%">{checkout?.lineItems?.length}</Badge>
      </Box>
    </Box>
  )
}

export default Navbar
