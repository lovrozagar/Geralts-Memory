// COMPONENTS
import Header from './components/Header'
import Score from './components/Score'
import Card from './components/Card'
import LoseDialog from './components/dialogs/Dialog'
// FUNCTIONALITY
import { createContext, useEffect, useMemo, useState } from 'react'
import { saveBest, getBest } from './functions/storage'
import shuffleArray from './functions/shuffleArray'
import getRandomCards from './functions/getRandomCards'
import uniqid from 'uniqid'

export const AppContext = createContext(null)

function App() {
  const STARTER_LEVEL = 1
  const STARTER_CARDS = 4
  const WIN_RECALL_POINTS = 154

  const [level, setLevel] = useState(STARTER_LEVEL)
  const [levelCards, setLevelCards] = useState(STARTER_CARDS)

  const [recall, setRecall] = useState(0)
  const [best, setBest] = useState(() => getBest())

  const [guessQueue, setGuessQueue] = useState([])
  const [shown, setShown] = useState(false)
  const [intractable, setIntractable] = useState(false)

  const [isWin, setIsWin] = useState(false)
  const [loseDialog, setLoseDialog] = useState(false)

  const cards = useMemo(
    () => [
      { name: 'geralt', id: uniqid() },
      { name: 'igni', id: uniqid() },
      { name: 'quen', id: uniqid() },
      { name: 'roach', id: uniqid() },
      { name: 'ciri', id: uniqid() },
      { name: 'vesimir', id: uniqid() },
      { name: 'eskel', id: uniqid() },
      { name: 'vernonRoche', id: uniqid() },
      { name: 'yennefer', id: uniqid() },
      { name: 'triss', id: uniqid() },
      { name: 'fringilla', id: uniqid() },
      { name: 'phillipa', id: uniqid() },
      { name: 'vilgefortz', id: uniqid() },
      { name: 'imlerith', id: uniqid() },
      { name: 'morkvarg', id: uniqid() },
      { name: 'olgierd', id: uniqid() },
      { name: 'gaunterOdimm', id: uniqid() },
      { name: 'deattlaff', id: uniqid() },
      { name: 'giant', id: uniqid() },
      { name: 'troll', id: uniqid() },
      { name: 'flyingRedanian', id: uniqid() },
      { name: 'ladyOfTheLake', id: uniqid() },
      { name: 'portal', id: uniqid() },
      { name: 'scorch', id: uniqid() },
    ],
    []
  )

  const [shuffledCards, setShuffledCards] = useState(() =>
    getRandomCards(cards, levelCards)
  )

  function handleMiss() {
    setRecall((prevRecall) => {
      saveBest(prevRecall)
      setBest((prevBest) => (prevBest < prevRecall ? prevRecall : prevBest))
      return 0
    })
    setLevel(1)
    openModal()
  }

  function handleClick(image) {
    document.activeElement.blur()

    setGuessQueue((prevQueue) => {
      if (prevQueue.includes(image)) {
        handleMiss()
        return []
      }
      setRecall((prevRecall) => {
        if (prevRecall + 1 === WIN_RECALL_POINTS) {
          setIsWin(true)
        }
        return prevRecall + 1
      })
      return [...prevQueue, image]
    })

    shownTimeoutToggle()
    intractableTimeoutToggle()
  }

  function shownTimeoutToggle() {
    setShown(false)
    setTimeout(() => setShown(true), 400)
  }

  function intractableTimeoutToggle() {
    setIntractable(false)
    setTimeout(() => setIntractable(true), 500)
  }

  function openModal() {
    setLoseDialog(true)
  }

  function closeModal() {
    setLoseDialog(false)
    setLevelCards(() => {
      setShuffledCards(getRandomCards(cards, 4))
      return STARTER_CARDS
    })
    setShown(false)
    setTimeout(() => setShown(true), 400)
    document.activeElement.blur()
  }

  useEffect(() => {
    const shownTimeout = setTimeout(() => setShown(true), 200)
    const intractableTimeout = setTimeout(() => setIntractable(true), 200)

    return () => {
      clearTimeout(shownTimeout)
      clearTimeout(intractableTimeout)
    }
  }, [])

  useEffect(() => {
    if (recall !== 0) {
      const element = document.querySelector('[data-recall]')
      element.classList.add('scale')
      setTimeout(() => {
        element.classList.remove('scale')
      }, 600)
    }
  }, [recall])

  useEffect(() => {
    if (best !== 0) {
      const element = document.querySelector('[data-best]')
      element.classList.add('scale')
      setTimeout(() => {
        element.classList.remove('scale')
      }, 600)
    }
  }, [best])

  useEffect(() => {
    document.activeElement.blur()

    if (loseDialog) setShown(true)

    if (!loseDialog)
      setTimeout(() => setShuffledCards((prev) => shuffleArray(prev)), 200)

    if (guessQueue.length === shuffledCards.length) {
      setGuessQueue([])
      setLevel((prev) => prev + 1)
      setLevelCards((prev) => {
        setTimeout(() => setShuffledCards(getRandomCards(cards, prev + 2)), 100)
        return prev + 2
      })
    }
  }, [guessQueue.length, shuffledCards.length, levelCards, cards, loseDialog])

  return (
    <AppContext.Provider value={{ recall, best }}>
      <div className='m-auto grid max-w-5xl px-2'>
        <Header level={level} />
        <Score />
        <div className='m-auto flex w-fit flex-wrap justify-center gap-3 pb-20 pt-4 laptop:gap-4'>
          {shuffledCards.map((card) => (
            <Card
              key={card.id}
              image={card.name}
              shown={shown}
              setShown={setShown}
              intractable={intractable}
              setIntractable={setIntractable}
              onClick={() => handleClick(card.name)}
            />
          ))}
        </div>
        <LoseDialog open={loseDialog} onClose={closeModal} isWin={isWin} />
      </div>
    </AppContext.Provider>
  )
}

export default App
