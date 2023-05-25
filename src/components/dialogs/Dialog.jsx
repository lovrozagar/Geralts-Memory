import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

LoseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isWin: PropTypes.bool.isRequired,
}

function LoseDialog({ open, onClose, isWin }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-2xl font-medium leading-6 text-white'
                >
                  {isWin ? 'You win' : 'You lose'}
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-lg text-gray-500'>
                    {isWin
                      ? `Looks like fortune favors the Witcher. Even the toughest battles can be won with a well-played Gwent hand. Keep harnessing your strategic prowess and let victory be your faithful companion!`
                      : `Looks like you've been dealt the 'Loser's Curse'. Even Geralt
                    has his off days. Keep shuffling those cards and turn the
                    tides in your favor!`}
                  </p>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-none bg-green-100 px-4 py-2 text-lg font-medium text-green-900 outline-green-200 hover:bg-green-200 focus-visible:outline focus-visible:outline-offset-2 '
                    onClick={onClose}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {isWin ? 'Easy' : 'Damn'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LoseDialog
