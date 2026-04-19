// Seeded RNG (mulberry32) — same seed always produces the same sequence
export function makeRng(seed) {
  let s = seed >>> 0

  const next = () => {
    s = (s + 0x6D2B79F5) >>> 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  return {
    next,
    pick:    arr => arr[Math.floor(next() * arr.length)],
    pickN:  (arr, n) => [...arr].sort(() => next() - 0.5).slice(0, n),
    int:    (min, max) => Math.floor(next() * (max - min + 1)) + min,
  }
}

export function hashSeed(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}
