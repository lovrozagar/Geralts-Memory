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

  useEffect(() => {
    switch (level) {
      case 2:
        setTitleProperties({
          style: 'text-green-500',
          text: 'Kaer Morhen Recruit',
        })
        break
      case 3:
        setTitleProperties({
          style: 'text-blue-500',
          text: 'Trial of the Grasses Initiate',
        })
        break
      case 4:
        setTitleProperties({
          style: 'text-violet-500',
          text: 'Witcher Trainee',
        })
        break
      case 5:
        setTitleProperties({
          style: 'text-amber-500',
          text: 'Apprentice of the Path',
        })
        break
      case 6:
        setTitleProperties({
          style: 'text-green-500 animate-pulse',
          text: 'Student of the Silver Swords',
        })
        break
      case 7:
        setTitleProperties({
          style: 'text-blue-500 animate-pulse',
          text: 'Slayer of Lesser Evil',
        })
        break
      case 8:
        setTitleProperties({
          style: 'text-violet-500 animate-pulse',
          text: 'Protector of the Innocent',
        })
        break
      case 9:
        setTitleProperties({
          style: 'text-amber-500 animate-pulse',
          text: "Master of the Witcher's Code",
        })
        break
      case 10:
        setTitleProperties({
          style: 'text-red-500 animate-pulse',
          text: 'White Wolf',
        })
        break
      default:
        setTitleProperties({
          style: 'text-slate-200',
          text: 'Child Surprise',
        })
    }
  }, [level])

  // text-shadow-lg shadow-slate-500

  return (
    <header className='pb-6 pt-4'>
      <div className='m-auto w-fit'>
        <div className='flex flex-wrap justify-center gap-3 py-1 text-center text-3xl'>
          {"GERALT'S"}
          <span className='text-stroke-title text-transparent'>MEMORY</span>
        </div>
        <span className='mb-2 mt-1 block w-full border-b border-neutral-700'></span>
      </div>
      <p className={currentLevelStyle}>{titleProperties.text}</p>
    </header>
  )
}

export default Header
