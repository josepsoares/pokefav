import React, { useEffect, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { BiChevronUp } from 'react-icons/bi'
import { motion } from 'framer-motion'

const ScrollingWrapper = () => {
  const [threshold, setThreshold] = useState(false)

  const onScroll = () => {
    if (window.scrollY >= 350) {
      setThreshold(true)
    } else if (window.scrollY < 350) {
      setThreshold(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, display: 'none' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      animate={
        threshold
          ? { display: 'block', opacity: 1 }
          : { opacity: 0, transitionEnd: { display: 'none' } }
      }
    >
      <IconButton
        colorScheme="blue"
        position="fixed"
        left="90%"
        top="85%"
        zIndex={3}
        isRound={true}
        onClick={scrollToTop}
        aria-label="Scroll Top"
        icon={<BiChevronUp size={30} />}
      />
    </motion.div>
  )
}

export default ScrollingWrapper
