import path from 'node:path'
import { move } from './build-translate'

move(path.resolve(process.cwd(), './node_modules/three/examples'), path.resolve(process.cwd(), './examples'))