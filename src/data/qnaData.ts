import { QnAItem } from '../types';

export const qnaData: QnAItem[] = [
  {
    id: 'what-is-webgl',
    category: 'Fundamentals',
    question: 'What is WebGL and how does it work under the hood?',
    shortAnswer: 'WebGL (Web Graphics Library) is a low-level JavaScript API for rendering interactive 2D and 3D graphics inside any compatible browser without plugins, utilizing the client’s GPU (Graphics Processing Unit).',
    detailedAnswer: [
      'WebGL is based on OpenGL ES (Embedded Systems). It interfaces directly with the computer\'s GPU hardware via rasterization.',
      'Under the hood, WebGL does only two fundamental things: it draws points, lines, and triangles, and it runs two programmable shader programs written in GLSL (OpenGL Shading Language):',
      '1. **Vertex Shader**: Computes the 3D coordinate projection of each vertex onto the 2D viewport screen coordinates.',
      '2. **Fragment (Pixel) Shader**: Computes the final color, light reflection, and transparency of each individual pixel that covers those triangles.',
      'WebGL alone is extremely verbose—drawing a single textured spinning cube in raw WebGL requires over 100+ lines of matrix math, buffer allocations, and shader compilation.'
    ],
    codeSnippet: `// Raw WebGL pipeline concept:
const canvas = document.querySelector('#glCanvas');
const gl = canvas.getContext('webgl2');

// 1. Create Buffers (VBO) for vertex positions
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...]), gl.STATIC_DRAW);

// 2. Compile Vertex & Fragment Shaders (GLSL)
const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
gl.useProgram(program);

// 3. Draw call
gl.drawArrays(gl.TRIANGLES, 0, 36);`,
    codeLanguage: 'javascript',
    tags: ['WebGL', 'GPU', 'GLSL', 'Rasterization', 'Canvas'],
    difficulty: 'Beginner'
  },
  {
    id: 'what-is-threejs',
    category: 'Fundamentals',
    question: 'What is Three.js and why do we use it over raw WebGL?',
    shortAnswer: 'Three.js is an open-source 3D JavaScript engine built on top of WebGL that abstracts low-level GPU buffer management, matrix transformations, lighting calculations, shaders, and geometry into an intuitive object-oriented Scenegraph.',
    detailedAnswer: [
      'Instead of manually compiling GLSL vertex/fragment shaders and calculating projection matrices by hand, Three.js provides high-level abstractions:',
      '• **Scene**: A 3D graph holding all objects, cameras, and lights.',
      '• **Camera**: Perspective or Orthographic viewing frustums that project 3D objects onto 2D screens.',
      '• **Renderer**: The engine (`WebGLRenderer`) that processes the scene and camera to paint pixels on a `<canvas>` element.',
      '• **Mesh**: The combination of a `Geometry` (shape vertices/faces) and a `Material` (appearance, shaders, textures, PBR lighting).',
      'Three.js also provides built-in loaders (GLTF/GLB, FBX, OBJ, textures), physics helpers, math utilities (Vector3, Matrix4, Quaternion), and post-processing passes.'
    ],
    codeSnippet: `import * as THREE from 'three';

// 1. Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Mesh (Geometry + Material)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.2 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 3. Light
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

// 4. Render loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();`,
    codeLanguage: 'javascript',
    tags: ['Three.js', 'Scenegraph', 'Renderer', 'PBR', 'Geometry'],
    difficulty: 'Beginner'
  },
  {
    id: 'what-is-r3f',
    category: 'R3F Core',
    question: 'What is React Three Fiber (R3F) and how does it reconcile JSX with Three.js?',
    shortAnswer: 'React Three Fiber (R3F) is a custom React reconciler for Three.js. It does NOT wrap Three.js in heavy wrappers or slow it down; instead, JSX elements map 1:1 directly to native Three.js classes.',
    detailedAnswer: [
      'Key realizations about R3F:',
      '1. **Zero Overhead / 1:1 Mapping**: `<mesh />` is literally `new THREE.Mesh()`. `<boxGeometry />` is `new THREE.BoxGeometry()`. `<meshStandardMaterial />` is `new THREE.MeshStandardMaterial()`. When Three.js adds a new class tomorrow, it is instantly available in R3F in lowercase camelCase format without updates.',
      '2. **Declarative Composition & React Ecosystem**: You can use React state (`useState`), effects (`useEffect`), Context, component composition, and Suspense for 3D asset loading.',
      '3. **Auto Disposal**: When a component unmounts in React, R3F automatically calls `.dispose()` on geometries and materials, preventing catastrophic WebGL memory leaks.',
      '4. **Drei Ecosystem**: Access to `@react-three/drei` for production utilities (OrbitControls, Text3D, Environment, Float, Html overlays, GLTF loaders, Shadows).'
    ],
    codeSnippet: `import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Runs every single frame on the render loop
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.8} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <RotatingCube />
    </Canvas>
  );
}`,
    codeLanguage: 'tsx',
    tags: ['R3F', 'Reconciler', 'JSX', 'Declarative', 'Drei'],
    difficulty: 'Beginner'
  },
  {
    id: 'r3f-props-and-attach',
    category: 'R3F Core',
    question: 'How do "attach", "args", and constructor props work in R3F?',
    shortAnswer: 'R3F uses `args` to pass parameters to the class constructor (e.g. new THREE.BoxGeometry(...args)) and `attach` to assign an object to a parent property (like material or geometry).',
    detailedAnswer: [
      '• **`args`**: Equivalent to constructor arguments: `<boxGeometry args={[width, height, depth]} />` executes `new THREE.BoxGeometry(width, height, depth)`. Whenever `args` change, R3F safely reconstructs and swaps the object.',
      '• **`attach`**: Tells R3F which property of the parent mesh this child attaches to. By default:',
      '  - Geometry tags (`*Geometry`) attach to `parent.geometry`',
      '  - Material tags (`*Material`) attach to `parent.material`',
      '• **Dot notation property piercing**: `<meshStandardMaterial color="hotpink" />` sets `.color.set("hotpink")`. You can pierce nested properties with dashes: `position-x={2}` or `rotation-y={Math.PI / 2}` for lightning fast updates without recreating vectors.'
    ],
    codeSnippet: `// 1. Passing constructor args
<sphereGeometry args={[1, 32, 32]} /> // radius: 1, widthSegments: 32, heightSegments: 32

// 2. Pierced props (fast, no new Vector3 allocation)
<mesh position-x={3} position-y={1.5} rotation-z={Math.PI / 4}>
  <boxGeometry />
  <meshStandardMaterial color="#10b981" />
</mesh>

// 3. Attaching to custom slots
<mesh>
  <bufferGeometry />
  {/* Attaching an array of materials */}
  <meshStandardMaterial attach="material-0" color="red" />
  <meshStandardMaterial attach="material-1" color="blue" />
</mesh>`,
    codeLanguage: 'tsx',
    tags: ['args', 'attach', 'Props', 'Piercing', 'Reconstruction'],
    difficulty: 'Intermediate'
  },
  {
    id: 'useframe-vs-usestate',
    category: 'Hooks & Lifecycle',
    question: 'Why should you NEVER use `useState` for continuous animations in R3F, and how does `useFrame` work?',
    shortAnswer: 'Setting React state at 60 FPS triggers 60 full React component tree re-renders per second, causing massive lag and garbage collection pauses. `useFrame` executes directly on the 60/120fps render loop via mutable refs.',
    detailedAnswer: [
      '• **The 60 FPS Rule in R3F**: React is designed for coarse-grained state updates (clicks, network responses, modal toggles). 3D animations are fine-grained continuous mutations.',
      '• **`useFrame((state, delta) => { ... })`**: Hook that binds to the canvas render loop.',
      '  - `state.clock.elapsedTime`: Total seconds since mount (great for sine waves `Math.sin(clock.elapsedTime)`).',
      '  - `delta`: Time in seconds since the last frame (e.g. `0.016s` at 60fps). Always multiply speed by `delta` to ensure frame-rate independent animations across 60Hz, 120Hz, and 144Hz monitors.',
      '• Mutate `meshRef.current.position`, `.rotation`, `.scale`, or custom uniforms directly inside `useFrame` for buttery smooth 60+ FPS.'
    ],
    codeSnippet: `import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // 1. Frame-rate independent continuous rotation
    meshRef.current.rotation.y += 1.5 * delta;

    // 2. Smooth floating bobbing motion using Sine wave
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 2) * 0.25;

    // 3. Optional: Subtle mouse parallax
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      state.pointer.y * 0.2,
      0.1
    );
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#06b6d4" roughness={0.1} metalness={0.9} />
    </mesh>
  );
}`,
    codeLanguage: 'tsx',
    tags: ['useFrame', 'delta', 'Clock', 'Performance', 'Animation'],
    difficulty: 'Intermediate'
  },
  {
    id: 'what-are-shaders-glsl',
    category: 'Materials & Shaders',
    question: 'What are Vertex and Fragment Shaders, Uniforms, Attributes, and Varyings?',
    shortAnswer: 'Shaders are tiny C-like GPU programs (GLSL) that execute simultaneously for thousands of vertices and millions of pixels in parallel.',
    detailedAnswer: [
      'The 3 core data channels in GLSL shaders are:',
      '1. **Uniforms**: Read-only variables passed from JavaScript/React into the shader that stay constant across all vertices/pixels in a draw call (e.g., `uTime`, `uMouse`, `uColor`, `uResolution`).',
      '2. **Attributes**: Per-vertex data provided by the geometry (e.g., `position`, `normal`, `uv` texture coordinates). Only accessible in the Vertex Shader.',
      '3. **Varyings**: Variables computed in the Vertex Shader that get automatically interpolated across the face of the triangle and passed into the Fragment Shader (e.g., `vUv`, `vNormal`, `vElevation`).',
      '• **Vertex Shader pipeline**: Takes 3D model coordinates -> outputs `gl_Position` (clip-space 2D).',
      '• **Fragment Shader pipeline**: Computes pixel lighting, math, noise, and textures -> outputs `gl_FragColor` (RGBA color).'
    ],
    codeSnippet: `// Custom ShaderMaterial in R3F with shaderMaterial utility from Drei
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const WaveShaderMaterial = shaderMaterial(
  // 1. Uniforms
  { uTime: 0, uColor: new THREE.Color('#3b82f6') },
  // 2. Vertex Shader (GLSL)
  \`
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      // Displace vertices in wave
      float elevation = sin(pos.x * 3.0 + uTime * 2.0) * 0.2;
      pos.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  \`,
  // 3. Fragment Shader (GLSL)
  \`
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColor;

    void main() {
      vec3 finalColor = mix(uColor, vec3(1.0, 0.2, 0.6), vElevation * 2.0 + 0.5);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  \`
);

extend({ WaveShaderMaterial });`,
    codeLanguage: 'tsx',
    tags: ['GLSL', 'Vertex Shader', 'Fragment Shader', 'Uniforms', 'Varyings'],
    difficulty: 'Advanced'
  },
  {
    id: 'performance-instancing-and-drawcalls',
    category: 'Performance & Best Practices',
    question: 'How do you optimize R3F scenes for 60+ FPS: Draw calls, InstancedMesh, and Texture Compression?',
    shortAnswer: 'The #1 bottleneck in WebGL is the CPU-to-GPU draw call count. You can render 100,000 objects with 1 draw call using `<instancedMesh>` or `@react-three/drei`’s `<Instances>` rather than 100,000 separate `<mesh>` tags.',
    detailedAnswer: [
      'Top Performance Golden Rules:',
      '1. **Instancing**: 1,000 individual `<mesh>` components = 1,000 draw calls (lags CPU). 1 `<instancedMesh>` with count 1,000 = 1 draw call (runs at 120 FPS).',
      '2. **Geometry Merging**: Use `BufferGeometryUtils.mergeGeometries()` for static, non-moving environment meshes.',
      '3. **DRACO & KTX2 / Basis Compression**: Compress GLTF models with gltf-transform and DRACO/Meshopt to shrink 50MB files to 2MB and upload GPU textures directly without CPU decompression.',
      '4. **Pixel Ratio Clamping**: Never do `dpr={[1, 3]}` on high-res Retina phones (renders 9x more pixels). Always clamp to `dpr={[1, 2]}` or `dpr={[1, 1.5]}` on mobile.',
      '5. **Frustum & Occlusion Culling**: Hide meshes that are off-screen or behind walls.'
    ],
    codeSnippet: `import { Instances, Instance } from '@react-three/drei';

// Rendering 500 animated particles with ONE single draw call
export function ForestOfCubes({ count = 500 }) {
  return (
    <Instances range={count}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial roughness={0.2} metalness={0.7} />

      {Array.from({ length: count }).map((_, i) => (
        <Instance
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
          color={i % 2 === 0 ? '#6366f1' : '#ec4899'}
        />
      ))}
    </Instances>
  );
}`,
    codeLanguage: 'tsx',
    tags: ['Performance', 'Instancing', 'Draw Calls', 'Optimization', 'DPR'],
    difficulty: 'Advanced'
  },
  {
    id: 'usethree-and-viewport',
    category: 'Hooks & Lifecycle',
    question: 'What is `useThree()` and how does responsive 3D viewport sizing work?',
    shortAnswer: '`useThree()` provides direct access to the entire R3F root state: the active camera, scene, WebGLRenderer (`gl`), viewport dimensions in 3D Three.js units, canvas pixel size, and pointer coordinates.',
    detailedAnswer: [
      '• `const { camera, scene, gl, viewport, size, pointer } = useThree()`',
      '• **`viewport` (3D units)**: Calculates the visible 3D width and height of the canvas at the object\'s current depth. If you want a 3D plane to span the exact screen width regardless of window resize, set its geometry to `<planeGeometry args={[viewport.width, viewport.height]} />`!',
      '• **`size` (Pixel units)**: The actual CSS/canvas pixel width and height (e.g. `size.width = 1920`, `size.height = 1080`).',
      '• **`pointer`**: Normalized mouse position from `(-1, -1)` bottom-left to `(+1, +1)` top-right.'
    ],
    codeSnippet: `import { useThree } from '@react-three/fiber';

function ResponsiveBackgroundPlane() {
  // viewport.width & viewport.height are in Three.js world units at z = 0
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, -2]}>
      {/* Automatically stretches to fill 100% of the screen seamlessly */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial color="#0f172a" />
    </mesh>
  );
}`,
    codeLanguage: 'tsx',
    tags: ['useThree', 'Viewport', 'Responsive', 'Camera', 'Pointer'],
    difficulty: 'Intermediate'
  }
];
