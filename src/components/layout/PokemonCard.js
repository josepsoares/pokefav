import * as React from 'react'
import { memo, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'

import { useInvertedBorderRadius } from 'utils/use-inverted-border-radius'
import { useScrollConstraints } from 'utils/use-scroll-constraints'
import { useWheelScroll } from 'utils/use-wheel-scroll'
import { useInvertedScale } from 'framer-motion/types/value/use-inverted-scale'

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150
const openSpring = { type: 'spring', stiffness: 200, damping: 30 }
const closeSpring = { type: 'spring', stiffness: 300, damping: 35 }

const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`

export const Card = memo(
  ({
    isSelected,
    id,
    title,
    category,
    history,
    pointOfInterest,
    backgroundColor
  }) => {
    const y = useMotionValue(0)
    const zIndex = useMotionValue(isSelected ? 2 : 0)

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20)

    const invertedContent = useInvertedScale()

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null)
    const constraints = useScrollConstraints(cardRef, isSelected)

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && history.push('/')
    }

    function checkZIndex(latest) {
      if (isSelected) {
        zIndex.set(2)
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0)
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null)
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    )

    return (
      <li ref={containerRef} className={`card`}>
        <Overlay isSelected={isSelected} />
        <div className={`card-content-container ${isSelected && 'open'}`}>
          <motion.div
            ref={cardRef}
            className="card-content"
            style={{ ...inverted, zIndex, y }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <motion.div
              className="card-image-container"
              style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
            >
              <motion.img
                className="card-image"
                src={`images/${id}.jpg`}
                alt=""
                initial={false}
                animate={
                  isSelected
                    ? { x: -20, y: -20 }
                    : { x: -pointOfInterest, y: 0 }
                }
                transition={closeSpring}
              />
            </motion.div>
            <motion.div
              className="title-container"
              initial={false}
              animate={{ x, y }}
              transition={isSelected ? openSpring : closeSpring}
              transformTemplate={scaleTranslate}
              style={{ ...inverted, originX: 0, originY: 0 }}
            >
              <span className="category">{category}</span>
              <h2>{title}</h2>
            </motion.div>
            <motion.div
              className="content-container"
              style={{ ...invertedContent, originY: 0, originX: 0 }}
            ></motion.div>
          </motion.div>
        </div>
        {!isSelected && <Link to={id} className={`card-open-link`} />}
      </li>
    )
  },
  (prev, next) => prev.isSelected === next.isSelected
)

const Overlay = ({ isSelected }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    className="overlay"
  >
    <Link to="/" />
  </motion.div>
)
