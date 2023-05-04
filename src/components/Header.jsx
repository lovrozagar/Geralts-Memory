import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

Header.propTypes = {
  level: PropTypes.number.isRequired,
}

function Header({ level = 1 }) {
  const [titleProperties, setTitleProperties] = useState({
    style: 'text-slate-200',
    text: 'Child Suprise',
  })
  const baseLevelStyle =
    'text-center text-lg font-thin w-fit m-auto transition-all'
  const currentLevelStyle = `${baseLevelStyle} ${titleProperties.style}`

  return (
    <header className='pt-2 pb-4'>
      <div className='w-fit m-auto'>
        <h1 className='flex flex-wrap justify-center gap-3 py-1 text-3xl text-center'>
          {"GERALT'S"}
          <span className='text-black text-stroke-title'>MEMORY</span>
        </h1>
        <span className='block mb-1 border-b border-neutral-700 w-full'></span>
      </div>
      <p className={currentLevelStyle}>{titleProperties.text}</p>
    </header>
  )
}

export default Header
