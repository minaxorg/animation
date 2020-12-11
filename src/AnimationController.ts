import { lowerBound, upperBound } from './constants'
import Listenable, { AnimationStatus } from './Listenable'

const clamp = (min: number, max: number, val: number): number =>
  Math.min(Math.max(min, val), max)

class AnimationController extends Listenable {
  private _duration: number
  private lowerBound: number = lowerBound
  private upperBound: number = upperBound
  private _status: AnimationStatus = AnimationStatus.dismissed
  private _value: number = 0
  constructor({ duration }: { duration: number }) {
    super()
    this._duration = duration
  }

  get status(): AnimationStatus {
    return this._status
  }

  get value(): number {
    return this._value
  }

  private linear(t: number, b: number, c: number, d: number) {
    return (c * t) / d + b
  }

  private _updateStatus(status: AnimationStatus) {
    this._status = status
    this.notifyStatusListeners(status)
  }

  /**
   * 执行一次动画
   */
  forward() {
    if (this._status !== AnimationStatus.dismissed) return
    this._updateStatus(AnimationStatus.forward)
    const startTime = new Date().getTime()
    const frameCb = () => {
      if (this._status !== AnimationStatus.forward) return
      const current = new Date().getTime()
      const spendTime = current - startTime /// 花费的毫秒数
      this._value = this.linear(
        clamp(0, this._duration, spendTime),
        this.lowerBound,
        this.upperBound - this.lowerBound,
        this._duration
      )
      this.notifyListeners()
      if (spendTime < this._duration) {
        window.requestAnimationFrame(frameCb)
      } else if (spendTime >= this._duration) {
        this._updateStatus(AnimationStatus.completed)
      }
    }
    window.requestAnimationFrame(frameCb)
  }

  /**
   * 重置动画
   */
  reset() {
    this._updateStatus(AnimationStatus.dismissed)
  }
}

export default AnimationController
