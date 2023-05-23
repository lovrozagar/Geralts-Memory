import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

Card.propTypes = {
  image: PropTypes.string.isRequired,
  shown: PropTypes.bool.isRequired,
  setShown: PropTypes.func.isRequired,
  onClick: PropTypes.func,
}

function Card({ image, shown, intractable, onClick }) {
  console.log('card')

  const [source, setSource] = useState({})

  useEffect(() => {
    console.log('eff')
    import(`../assets/images/${image}.webp`)
      .then((img) => {
        setSource({ src: img.default, alt: image })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [image])

  return (
    <button
      className={
        intractable
          ? 'relative flex rounded outline-none overflow-hidden select-none active:scale-95 focus:scale-105 focus:-top-2 focus:rotate-2 focus:brightness-110 hover:scale-105'
          : 'flex  rounded outline-none overflow-hidden select-none pointer-events-none'
      }
      tabIndex={0}
      onClick={onClick}
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.375}
        glareColor='#ffffff'
        glarePosition='all'
        glareBorderRadius='8px'
      >
        <Transition
          as={Fragment}
          show={shown}
          enter='transform transition duration-[330ms]'
          enterFrom='opacity-0 rotate-[-120deg] scale-50'
          enterTo='opacity-100 rotate-0 scale-100'
          leave='transform duration-50 transition ease-in-out'
          leaveFrom='opacity-100 rotate-0 scale-100 '
          leaveTo='opacity-0 scale-95 '
        >
          <div className='relative -z-10'>
            <div className='py-[0.3rem] px-1 h-60 tablet:h-72 laptop:h-80 aspect-[10/14] bg-border bg-contain bg-no-repeat'>
              <img
                className='relative -z-10 rounded-lg'
                src={source.src}
                alt={source.alt}
              />
            </div>
          </div>
        </Transition>
      </Tilt>
    </button>
  )
}

export default Card
