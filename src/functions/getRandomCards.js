function getRandomCards(arr, cardNumber) {
  if (arr.length < cardNumber) {
    throw new Error('Not enough cards')
  }

  const result = []
  const indices = new Set()

  while (indices.size < cardNumber) {
    const index = Math.floor(Math.random() * arr.length)

    if (!indices.has(index)) {
      indices.add(index)
      result.push(arr[index])
    }
  }

  return result
}

export default getRandomCards
