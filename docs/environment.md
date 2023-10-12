<script setup>
    import Environment from './code/Utils-Environment.vue'
</script>

# 环境模拟

## snow
 
 ```ts
import { createSnow } from 'thunder-utils'

const [snowStart, snowStop] = createSnow(10, 1000, {
    x: 1,
    y: 20,
}, 1, 600)

snowStart()
 ```
<Environment type='snow'/>

### create Api


| Property | Type                        | Default | Description                     |
| -------- | --------------------------- | ------- | ------------------------------- |
| size | number                     | false   | 雪大小                        |
| range | number | -       | 降雪范围 |
| speed | SpeedType({x:number,y:number,z:number}) | -       | 降雪速度 |
| opacity | number | -       | 雪透明度 |
| count | number | -       | 雪密度 |

## rain

```ts
import { createRain } from 'thunder-utils'

const [rainStart, rainStop] = createRain(2, 1000, {
    x: 1,
    y: 20,
}, 1, 600)

rainStart()

```
<Environment type='rain'/>


### create Api


| Property | Type                        | Default | Description                     |
| -------- | --------------------------- | ------- | ------------------------------- |
| size | number                     | false   | 雨滴大小                        |
| range | number | -       | 降雨范围 |
| speed | SpeedType({x:number,y:number,z:number}) | -       | 降雨速度 |
| opacity | number | -       | 雨滴透明度 |
| count | number | -       | 雨滴密度 |