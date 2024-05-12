const fragmentShader = /* glsl */`

	uniform float threshold;
	uniform float edgeWidth;
	uniform float edgeBrightness;
	uniform vec3 edgeColor;

	uniform sampler2D mainTex;      // 获取纹理
	uniform sampler2D  noiseTex;    // 需要使用的噪点图片

	varying vec2 vUv;   // 纹理坐标

	void main(void){

			// float threshold = 0.5;

			// texture2D()获取颜色值

			vec4 color = texture2D(mainTex, vUv);
			// 纹理贴图中该点处的颜色值(r, g, b, a)

			vec4 noiseValue = texture2D(noiseTex, vUv);
			// 噪点图片中该点处的颜色值(r, g, b, a)，r == g == b

			if(noiseValue.r < threshold)
			{
					discard;
			}

			if(noiseValue.r - edgeWidth < threshold){
					color = vec4(edgeColor, 1.0);
			}

			gl_FragColor = color;
	}

`

export default fragmentShader