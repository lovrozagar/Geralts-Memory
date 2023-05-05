import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AppContext } from '../App'

function Score() {
  return (
    <section className='flex justify-evenly mt-3 mb-10 mx-6 tablet:mx-0'>
      <DisplayBubble type='recall' />
      <DisplayBubble type='best' />
    </section>
  )
}

DisplayBubble.propTypes = {
  type: PropTypes.string.isRequired,
}

function DisplayBubble({ type }) {
  const { recall, best } = useContext(AppContext)
  const data = type === 'recall' ? `Recall: ${recall}` : `Best: ${best}`
  const props =
    type === 'recall' ? { datarecall: 'true' } : { databest: 'true' }

  const baseStyling =
    'text-center px-5 py-2 w-[150px] rounded-lg bg-neutral-1000 transition-all'
  const boxShadow =
    type === 'recall'
      ? 'shadow-[0_0_40px_-8px_rgba(226,232,240,0.3)]'
      : 'shadow-[0_0_40px_-8px_rgba(34,197,94,0.3)]'
  const styling = `${baseStyling} ${boxShadow}`

  return (
    <div className={styling} {...props}>
      {data}
    </div>
  )
}

export default Score
