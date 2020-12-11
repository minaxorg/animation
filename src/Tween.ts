import AnimationController from './AnimationController'
import Animator from './Animator'
import { upperBound } from './constants'
import { AnimationStatus } from './Listenable'

export enum EasingFunctions {
  linear,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInBack,
  easeOutBack,
  easeInOutBack,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce,
}

class Tween {
  easingFunction: EasingFunctions
  begin: number
  end: number
  constructor(params?: {
    begin?: number
    end?: number
    easingFunction?: EasingFunctions
  }) {
    this.begin = params?.begin ?? 0
    this.end = params?.end ?? 1
    this.easingFunction = params?.easingFunction ?? EasingFunctions.linear
  }

  private linear(t: number, b: number, c: number, d: number) {
    return (c * t) / d + b
  }

  private easeInSine(t: number, b: number, c: number, d: number) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
  }

  private easeOutSine(t: number, b: number, c: number, d: number) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b
  }

  private easeInOutSine(t: number, b: number, c: number, d: number) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
  }

  private easeInQuad(t: number, b: number, c: number, d: number) {
    return c * (t /= d) * t + b
  }

  private easeOutQuad(t: number, b: number, c: number, d: number) {
    return -c * (t /= d) * (t - 2) + b
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
  }

  private easeInCubic(t: number, b: number, c: number, d: number) {
    return c * (t /= d) * t * t + b
  }

  private easeOutCubic(t: number, b: number, c: number, d: number) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }

  private easeInOutCubic(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b
    return (c / 2) * ((t -= 2) * t * t + 2) + b
  }

  private easeInQuart(t: number, b: number, c: number, d: number) {
    return c * (t /= d) * t * t * t + b
  }

  private easeOutQuart(t: number, b: number, c: number, d: number) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  }

  private easeInOutQuart(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
  }

  private easeInQuint(t: number, b: number, c: number, d: number) {
    return c * (t /= d) * t * t * t * t + b
  }

  private easeOutQuint(t: number, b: number, c: number, d: number) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  }

  private easeInOutQuint(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b
    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
  }

  private easeInExpo(t: number, b: number, c: number, d: number) {
    return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  }

  private easeOutExpo(t: number, b: number, c: number, d: number) {
    return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
  }

  private easeInOutExpo(t: number, b: number, c: number, d: number) {
    if (t === 0) return b
    if (t === d) return b + c
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
  }

  private easeInCirc(t: number, b: number, c: number, d: number) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  }

  private easeOutCirc(t: number, b: number, c: number, d: number) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  }

  private easeInOutCirc(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  }

  private easeInBack(t: number, b: number, c: number, d: number, s?: number) {
    if (typeof s === 'undefined') s = 1.70158
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  }

  private easeOutBack(t: number, b: number, c: number, d: number, s?: number) {
    if (typeof s === 'undefined') s = 1.70158
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  }

  private easeInOutBack(
    t: number,
    b: number,
    c: number,
    d: number,
    s?: number
  ) {
    if (typeof s === 'undefined') s = 1.70158
    if ((t /= d / 2) < 1)
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  }

  private easeInElastic(
    t: number,
    b: number,
    c: number,
    d: number,
    a?: number,
    p?: number
  ) {
    let s
    if (t === 0) return b
    if ((t /= d) === 1) return b + c
    if (typeof p === 'undefined') p = d * 0.3
    if (!a || a < Math.abs(c)) {
      s = p / 4
      a = c
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    )
  }

  private easeOutElastic(
    t: number,
    b: number,
    c: number,
    d: number,
    a?: number,
    p?: number
  ) {
    let s
    if (t === 0) return b
    if ((t /= d) === 1) return b + c
    if (typeof p === 'undefined') p = d * 0.3
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    )
  }

  private easeInOutElastic(
    t: number,
    b: number,
    c: number,
    d: number,
    a?: number,
    p?: number
  ) {
    let s
    if (t === 0) return b
    if ((t /= d / 2) === 2) return b + c
    if (typeof p === 'undefined') p = d * (0.3 * 1.5)
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      )
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    )
  }

  private easeInBounce(t: number, b: number, c: number, d: number) {
    return c - this.easeOutBounce(d - t, 0, c, d) + b
  }

  private easeOutBounce(t: number, b: number, c: number, d: number) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
    }
  }

  private easeInOutBounce(t: number, b: number, c: number, d: number) {
    if (t < d / 2) {
      return this.easeInBounce(t * 2, 0, c, d) * 0.5 + b
    } else {
      return this.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
  }

  animate(animationController: AnimationController): Animator {
    const animator = new Animator({ value: this.begin })
    let easingFunction: (t: number, b: number, c: number, d: number) => number
    switch (this.easingFunction) {
      case EasingFunctions.linear:
        easingFunction = this.linear
        break
      case EasingFunctions.easeInSine:
        easingFunction = this.easeInSine
        break
      case EasingFunctions.easeOutSine:
        easingFunction = this.easeOutSine
        break
      case EasingFunctions.easeInOutSine:
        easingFunction = this.easeInOutSine
        break
      case EasingFunctions.easeInQuad:
        easingFunction = this.easeInQuad
        break
      case EasingFunctions.easeOutQuad:
        easingFunction = this.easeOutQuad
        break
      case EasingFunctions.easeInOutQuad:
        easingFunction = this.easeInOutQuad
        break
      case EasingFunctions.easeInCubic:
        easingFunction = this.easeInCubic
        break
      case EasingFunctions.easeOutCubic:
        easingFunction = this.easeOutCubic
        break
      case EasingFunctions.easeInOutCubic:
        easingFunction = this.easeInOutCubic
        break
      case EasingFunctions.easeInQuart:
        easingFunction = this.easeInQuart
        break
      case EasingFunctions.easeOutQuart:
        easingFunction = this.easeOutQuart
        break
      case EasingFunctions.easeInOutQuart:
        easingFunction = this.easeInOutQuart
        break
      case EasingFunctions.easeInQuint:
        easingFunction = this.easeInQuint
        break
      case EasingFunctions.easeOutQuint:
        easingFunction = this.easeOutQuint
        break
      case EasingFunctions.easeInOutQuint:
        easingFunction = this.easeInOutQuint
        break
      case EasingFunctions.easeInExpo:
        easingFunction = this.easeInExpo
        break
      case EasingFunctions.easeOutExpo:
        easingFunction = this.easeOutExpo
        break
      case EasingFunctions.easeInOutExpo:
        easingFunction = this.easeInOutExpo
        break
      case EasingFunctions.easeInCirc:
        easingFunction = this.easeInCirc
        break
      case EasingFunctions.easeOutCirc:
        easingFunction = this.easeOutCirc
        break
      case EasingFunctions.easeInOutCirc:
        easingFunction = this.easeInOutCirc
        break
      case EasingFunctions.easeInBack:
        easingFunction = this.easeInBack
        break
      case EasingFunctions.easeOutBack:
        easingFunction = this.easeOutBack
        break
      case EasingFunctions.easeInOutBack:
        easingFunction = this.easeInOutBack
        break
      case EasingFunctions.easeInElastic:
        easingFunction = this.easeInElastic
        break
      case EasingFunctions.easeOutElastic:
        easingFunction = this.easeOutElastic
        break
      case EasingFunctions.easeInOutElastic:
        easingFunction = this.easeInOutElastic
        break
      case EasingFunctions.easeInBounce:
        easingFunction = this.easeInBounce
        break
      case EasingFunctions.easeOutBounce:
        easingFunction = this.easeOutBounce
        break
      case EasingFunctions.easeInOutBounce:
        easingFunction = this.easeInOutBounce
        break
    }
    const listener = () => {
      animator.value = easingFunction.apply(this, [
        animationController.value,
        this.begin,
        this.end - this.begin,
        upperBound,
      ])
      animator.notifyListeners()
    }
    const statusListener = (status: AnimationStatus) => {
      animator.notifyStatusListeners(status)
    }
    animationController.addListener(listener)
    animationController.addStatusListener(statusListener)
    return animator
  }
}

export default Tween
