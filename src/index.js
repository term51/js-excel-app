console.log('start? zaebis!')
import './scss/index.scss'

async function start() {
  return await Promise.resolve('zopa !!!')
}

start().then(console.log)
