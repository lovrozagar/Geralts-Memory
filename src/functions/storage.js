function saveBest(score) {
  const best = getBest()
  if (score > best) localStorage.setItem('best', score)
}

function getBest() {
  return parseInt(localStorage.getItem('best')) || 0
}

export { saveBest, getBest }
