import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

Card.propTypes = {
  image: PropTypes.string.isRequired,
  shown: PropTypes.bool.isRequired,
  intractable: PropTypes.bool,
  onClick: PropTypes.func,
}

function Card({ image, shown, intractable, onClick }) {
  const [source, setSource] = useState({})
  const [cardRefresh, setCardRefresh] = useState()

  useEffect(() => {
    setCardRefresh((prevRefresh) => prevRefresh + 1)
  }, [shown])

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
      key={cardRefresh}
      className={
        intractable
          ? 'relative flex select-none overflow-hidden rounded outline-none hover:scale-105 focus:-top-2 focus:rotate-2 focus:scale-105 focus:brightness-110 active:scale-95'
          : 'pointer-events-none  flex select-none overflow-hidden rounded outline-none'
      }
      tabIndex={0}
      onClick={onClick}
    >
      <Tilt glareEnable={false}>
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
            <div className='aspect-[10/14] h-60 bg-border bg-contain bg-no-repeat px-1 py-[0.3rem] tablet:h-72 laptop:h-80'>
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
