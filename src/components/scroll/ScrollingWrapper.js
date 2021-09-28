import React, { useEffect, useState } from 'react';
import { Icon, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollingWrapper = () => {
  const [threshold, setThreshold] = useState(false);

  const onScroll = () => {
    if (window.scrollY >= 350) {
      setThreshold(true);
    } else if (window.scrollY < 350) {
      setThreshold(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
        opacity="0.85"
        zIndex={3}
        isRound={true}
        onClick={scrollToTop}
        aria-label="Scroll Top"
        boxShadow="md"
        left={['90%', null, null, null, '94%']}
        top={['85%', null, null, null, '90%']}
        boxSize={['2.5rem', null, '3rem', '3.25rem']}
        icon={<Icon as={FaArrowUp} boxSize={6} />}
      />
    </motion.div>
  );
};

export default ScrollingWrapper;
