import path from 'node:path'
import { move } from './build-translate'

move(path.resolve(process.cwd(), './docs/.vitepress/dist'), path.resolve(process.cwd(), './docs/dist'))