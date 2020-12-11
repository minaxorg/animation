import Listenable from './Listenable'

class Animator extends Listenable {
  value: number

  constructor({ value }: { value: number }) {
    super()
    this.value = value
  }
}

export default Animator
