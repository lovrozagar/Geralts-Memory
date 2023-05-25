import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AppContext } from '../App'

function Score() {
  return (
    <section className='gap flex flex-wrap-reverse justify-center gap-x-4 gap-y-4 pb-4 widephone:mx-0 widephone:justify-evenly'>
      <DisplayBubble type='recall' />
      <DisplayBubble type='best' />
    </section>
  )
}

DisplayBubble.propTypes = {
  type: PropTypes.string.isRequired,
  recall: PropTypes.number,
  best: PropTypes.number,
}

function DisplayBubble({ type }) {
  const { recall, best } = useContext(AppContext)
  const data = type === 'recall' ? `Recall: ${recall}` : `Best: ${best}`
  const props =
    type === 'recall' ? { 'data-recall': 'true' } : { 'data-best': 'true' }

  const baseStyling =
    'text-center px-5 py-2 w-full max-w-[160px] rounded-lg transition-all bg-black'
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
