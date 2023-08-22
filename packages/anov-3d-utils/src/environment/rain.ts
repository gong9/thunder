import type { Points } from '@anov/3d'
import { globalObjectManage, use } from '@anov/3d'
import type { AVector3 } from './utils/points'
import EnvironmentPoints from './utils/points'

const { useframe } = use

type CreateRainReturn = [
  () => void,
  () => void,
]

export interface SpeedType {
  x?: number
  y?: number
  z?: number
}

/**
 * create rain
 * @param size 雨滴大小
 * @param range 降雨范围
 * @param speed 降雨速度
 * @param opacity 雨滴透明度
 * @param count 雨滴密度
 * @returns
 */
export const createRain = (size = 10, range = 100, speed?: SpeedType, opacity = 0.6, count = 100) => {
  const points = new EnvironmentPoints({
    size,
    opacity,
    range,
    count,
    speed,
    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAOeSURBVHic7Zq9jxRlHMc/z8yz87K3nsCdmOMUuAMT9GJhYgyxk8IYG2sJMTQUUECBuU4aWhusoKUAEhttjH+AEopLLCxQCXLqeUi84y7L7t687lDMjsdL4Nh7npk1eeZbTZ7sfp9v9vns7/nNMyMYkRZu338ZYIeXzQEcnJ64Pooc1igm/T9JjmriA1Ot4wANS+wdDNUEjEJiVBP3gvi3PIDYAeB7cvcochhPQOU14Kc7a/sBfMd+AyAbjP++vLEPYHaP/0eVeWoCqp5wZtKbB8g2Fx+AiXH79ODybJV5jCeg8l0gTtIMQNqP//ZR0gfAbdiVZjKegMpqwHq7Mw9Pr3whR+bjK53oM4DJlnO5ilzGE1DZ/y2K0wigIa3G8z7XC9NFgDFPzlQQqyag9BrwoBudgq1XvlDTtfcD/PLX6kcAh16f+L60cNQElF8DekHcA/Bd6Q/zvW6Y3ARoeY23yshVyHgCSqsBq534LAy/8oXGXPtNgD9Xwk8A9k663+pLtynjCSitBoRx3vMXHd52tREm/wI0vUYpJ0bGE6C9Bqx1ogsAjrSK+30lynzHfgVgtROcAZhoeReUAj4h4wnQVgO++u6WC3Dyw9kAnn3Xt12l/RwoaVta61ZNgC6jdje4BNDynRMAQohSdpj1TnAeYOdL/jkdfjUBuoyeddanW0GUAOC7DS3ZjSdAuQ9YeRCdhPJXvpDn5JH/vt/7FGB6V/Oqil9NgKpBy7OO6AjyosqyvB/YOSY/HgzVBKhImQCBeFtHkBeeb9BeWMJ+T4dfTYAGjwMaPIaWEMzq8DGeAOVuKivK8oikes9hPAHKNaB4rq969jes4uKAQFE1AaoG/X52d3A5peo1jLJ+tqTDpyZA1UAI6+bgslIC+li/6vCpCVA1iNP0RwBH2h9AeWeBhYq+I4rjGzr8agJUDW4tta8BvHNw1xfqcbaWEHn3ut5LvtHhZzwB2v6v3SBZBGi69j5dno+qaPuCKF3O55HTOnyNJ0Db0+G1bvQ5QNP1vs5H9G4GYsDASntD69vkxhOgfc/uhfF1AK8hD8Nm1d6uin0/iPs3AJqufF8146MyngDtb4icurJ0BODi0ddWAVznv7fEhiUh7/iStJv7/lDK8wfjCSitb19Y7E4BzE27CwCetIu7xa3mzAA2wmQZ4M7d8F2AuZnWP2XkrAmoaqJ77XAeYNyVxwCkzWNPlJKUnwHaYXwZ4NVx78sqchlPwENsoeFfLBJUzgAAAABJRU5ErkJggg==',
  })

  let removeFrame: (() => void) | null = null

  const start = () => {
    globalObjectManage.scene!.add(points.point!)

    removeFrame = useframe(() => {
      points.animation(
        (position: AVector3) => {
          position.y -= position.speedY

          if (position.y <= 0)
            position.y = 1000 / 2
        },
      )
    })
  }

  const stop = () => {
    if (removeFrame) {
      removeFrame()
      globalObjectManage.scene!.remove(points.point!)
    }
  }

  return [
    start,
    stop,
  ] as CreateRainReturn
}