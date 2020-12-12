/* eslint-disable no-undef */
/* eslint-disable import/no-absolute-path */
import {
  AnimationController,
  EasingFunctions,
  Tween,
} from '//cdn.jsdelivr.net/npm/@minax/animation@latest/dist/animation.esm.js'
const { useRef } = React
const { render } = ReactDOM

function App() {
  const canvasRef = useRef(null)
  const controller = useRef(null)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <select
        style={{ width: 302 }}
        onChange={(e) => {
          if (controller.current !== null) {
            controller.current.reset()
          }
          if (e.target.value === '-1') return
          if (canvasRef.current !== null) {
            const animationController = new AnimationController({
              duration: 1500,
            })
            controller.current = animationController
            const ctx = canvasRef.current.getContext('2d')
            let offsetX = 100
            const offsetY = 200
            if (ctx != null) {
              ctx.clearRect(0, 0, 300, 300)
              ctx.strokeStyle = '#70a982'
              ctx.lineWidth = 2
              ctx.beginPath()
              ctx.moveTo(offsetX, offsetY)
            }
            const animation = new Tween({
              begin: 0,
              end: 100,
              easingFunction: EasingFunctions[e.target.value],
            }).animate(animationController)
            animation.addListener(() => {
              offsetX++
              ctx?.lineTo(offsetX, offsetY - animation.value)
              ctx?.stroke()
            })
            setTimeout(() => {
              animationController.forward()
            }, 100)
          }
        }}
      >
        <option value="-1">--Please choose an option--</option>
        {Object.values(EasingFunctions)
          .filter((v) => typeof v !== 'number')
          .map((k) => {
            return (
              <option value={k} key={k}>
                {k}
              </option>
            )
          })}
      </select>
      <canvas
        style={{ border: '1px solid #c0d3c7', marginTop: 16 }}
        width={300}
        height={300}
        ref={canvasRef}
      />
    </div>
  )
}

render(<App />, document.getElementById('app'))
