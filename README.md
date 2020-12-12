# @minax/animation [![npm](https://img.shields.io/npm/v/@minax/animation.svg)](https://www.npmjs.com/package/@minax/animation)

## Install
``` shell
npm i --save @minax/animation
```

## Usage

``` typescript
import {
  AnimationController,
  Tween,
  AnimationStatus,
  EasingFunctions,
} from '@minax/animation'

/**
 * 1. 初始化 animationController
*/
const animationController = new AnimationController({ duration: 1500 })

/**
 * 2. 使用 Tween 实例包装 animationController
*/
const animation = new Tween({
  /** 设置你想要的缓动函数 */
  easingFunction: EasingFunctions.easeInOutQuad,
  begin: 0,
  end: 100,
}).animate(animationController)

/**
 * 3. 添加事件回调
*/
animation.addListener(() => {
  /** animation.value 的范围即为第 2 步设置的 [begin, end] */
  console.log(animation.value)
})

/**
 * 4. 开始动画，大功告成
*/
animationController.forward()
```
### EasingFunctions
``` typescript
enum EasingFunctions {
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
```

### AnimationStatus

```typescript
enum AnimationStatus {
  /** 动画起始状态，此阶段调用 animationController.forward 方法可以开启动画 */
  dismissed = 'AnimationStatus.dismissed',

  /** 动画执行中状态 */
  forward = 'AnimationStatus.forward',

  /** 动画完成状态 */
  completed = 'AnimationStatus.completed',
}

// 调用 animationController.reset 方法可以重置动画为 dismissed 状态
// 另外可以通过 animationController.addStatusListener 的方法添加状态回调
// 回调函数中有一个参数表示当前动画状态
```

## Quick Overview

```typescript
import React, { useRef, useEffect } from 'react'
import {
  AnimationController,
  Tween,
  AnimationStatus,
  EasingFunctions,
} from '@minax/animation'

function App() {
  const r = useRef<HTMLDivElement>(null)
  useEffect(() => {
    /**
     * 1. 实例化 animationController，传入 duration 设置动画持续时长（单位：毫秒）
     * animatorController 会以 linear（线性）函数生成 0 -> 1 的值
     * 可以通过 addListener 来添加回调函数监听
     */
    const animationController = new AnimationController({ duration: 1500 })
    setInterval(() => {
      if (r.current) {
        const { scrollTop, scrollHeight } = r.current
        /**
         * 2. 实例化 Tween，传入需要使用的 easingFunction（缓动函数名称），和 begin（初始值）和 end（结束值）
         * 然后将 animationController 当做参数调用 Tween 实例的 animate 方法
         * 返回的 Animator 对象会以传入的缓动函数生成从 begin -> end 的值
         * 可以通过 addListener 来添加回调函数监听
         */
        const animation = new Tween({
          easingFunction: EasingFunctions.easeInOutQuad,
          begin: scrollTop,
          end: Math.round(Math.random() * scrollHeight),
        }).animate(animationController)
        animation.addListener(() => {
          /**
           * 3. 在回调函数里面通过 animation.value 获取值
           */
          r.current!.scrollTop = animation.value
        })
        if (animationController.status === AnimationStatus.completed) {
          animationController.reset()
        }
        /**
         * 4. 开始动画
         */
        animationController.forward()
      }
    }, 2000)
  }, [])
  return (
    <div
      ref={r}
      style={{
        height: 400,
        margin: 24,
        padding: '0 16px',
        overflow: 'auto',
        textAlign: 'center',
        border: '1px solid rgba(0, 0, 0, .2)',
      }}
    >
      {new Array(100).fill(1).map((i, index) => (
        <div
          key={index}
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#333',
            margin: '16px 0',
            boxShadow: '0 0 5px rgba(0, 0, 0, .1)',
            borderRadius: 4,
          }}
        >
          {index}
        </div>
      ))}
    </div>
  )
}
```