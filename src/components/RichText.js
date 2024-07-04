import React, { useRef } from 'react'
import { Box, Heading, Text, Center } from "@chakra-ui/react"

const RichText = ({ heading, text, className, addImg }) => {
  const txtBodyRef = useRef(null)
  const handleBodyClick = () => {
    txtBodyRef.current.classList.toggle('clamp') // toggle reveal the rest of the paragraph
  }
  return (
    <Box className={`richtext_container ${className}`} p={4}>
      <Center className='richtext_inner' display="flex" flexDir="column" textAlign="center">

        {(addImg != null) ? <img className='addedImg' src={addImg} alt="" /> : ''}

        {
          heading ?
            <Heading className='richtext_txt_head' >
              {heading}
            </Heading> : null
        }

        {text ?
          <Text ref={txtBodyRef} className='richtext_txt_body' onClick={handleBodyClick}>
            {text}
          </Text> : null
        }
      </Center>
    </Box>
  )
}

export default RichText
