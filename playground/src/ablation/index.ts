import { Color, ModelLoader, PMREMGenerator, SceneControl, ShaderMaterial, TextureLoader, lib, use } from 'thunder-3d'
import { Pane } from 'tweakpane'
import ver from './shader/ver'
import frag from './shader/frag'

const { RoomEnvironment } = lib

const scene = new SceneControl({
  orbitControls: true,
  reset: true,
  ambientLight: true,
})

scene.render(document.querySelector('#app')!)

const load = new ModelLoader()

const pmremGenerator = new PMREMGenerator(scene.renderer!)
pmremGenerator.compileEquirectangularShader()
const roomEnvironment = new (RoomEnvironment as any)()

scene.scene.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture

const textureLoader = new TextureLoader()

const text02 = textureLoader.loadAsync('https://i.postimg.cc/y8mHLC8Z/noise-2.png')

const mat = new ShaderMaterial({
  vertexShader: ver,
  fragmentShader: frag,
  uniforms: {
    edgeColor: { value: new Color('#0000d2') },
    edgeWidth: { value: 0.02 },
    edgeBrightness: { value: 2.0 },
    threshold: { value: 0.0 },
    noiseTex: {
      value: text02,
    },
  },
})

load.loadGLTF('./monkey.glb', false, true, './draco/', (gltf) => {
  scene.add(gltf.scene)

  gltf.scene.traverse((child) => {
    if (child.type === 'Mesh') {
      const mesh = child as THREE.Mesh
      const originalMaterial = mesh.material as THREE.MeshStandardMaterial

      originalMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.threshold = mat.uniforms.threshold
        shader.vertexShader = shader.vertexShader.replace(
          'void main() {',
          [
            'varying vec2 vUv;',
            'void main() {',
            'vUv = uv;',
          ].join('\n'),
        )

        shader.fragmentShader = shader.fragmentShader.replace('void main() {',
              `
    varying vec2 vUv;
	uniform float threshold;
	uniform float edgeWidth;
	uniform float edgeBrightness;
	uniform vec3 edgeColor;
    uniform float offset;    
	uniform sampler2D  noiseTex;
          void main() {
      `)

        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>',
              `
            #include <dithering_fragment>

			vec4 color = gl_FragColor;
			vec4 noiseValue = texture(noiseTex, vUv);

			if(noiseValue.r < threshold)
			{
					discard;
			}

			if(noiseValue.r - edgeWidth < threshold){
					color = vec4(edgeColor, 1.0);
			}
			gl_FragColor = color;
    `)
      }
    }
  })
  return gltf
})

const pane = new Pane()

pane.addBlade({
  view: 'slider',
  label: 'alpha',
  min: 0,
  max: 1,
  value: 0,
  step: 0.001,
})

pane.on('change', (ev) => {
  mat.uniforms.threshold.value = ev.value
})