import { ControllerDef } from '../types';

export const controllersData: ControllerDef[] = [
  {
    id: 'orbit-controls',
    name: 'OrbitControls',
    r3fTag: '<OrbitControls />',
    sourcePackage: '@react-three/drei',
    summary: 'The most popular camera controller: Rotate around a target point with mouse drag, pan with right click, and zoom with scroll.',
    description: 'Enables orbital navigation around a central 3D focal point. Supports smooth physics-based damping (inertia), angle clamps (preventing camera from flipping upside down or going beneath the floor), and auto-rotation.',
    features: [
      'Inertial Damping (`enableDamping={true}`, `dampingFactor={0.05}`)',
      'Polar Angle Constraints (`minPolarAngle`, `maxPolarAngle`) to prevent floor clipping',
      'Distance Clamping (`minDistance`, `maxDistance`) to limit zooming',
      'Auto-rotation (`autoRotate={true}`, `autoRotateSpeed={2}`)'
    ],
    controls: [
      { name: 'enableDamping', label: 'Enable Damping (Inertia)', type: 'boolean', defaultValue: true, description: 'Smooth deceleration when releasing mouse drag.' },
      { name: 'dampingFactor', label: 'Damping Factor', type: 'number', min: 0.01, max: 0.2, step: 0.01, defaultValue: 0.05, description: 'Friction rate (lower = more glide).' },
      { name: 'autoRotate', label: 'Auto Rotate', type: 'boolean', defaultValue: true, description: 'Continuously rotates scene camera.' },
      { name: 'autoRotateSpeed', label: 'Rotate Speed', type: 'number', min: 0.5, max: 10, step: 0.5, defaultValue: 2.0, description: 'Speed of the automatic orbital turn.' },
      { name: 'enableZoom', label: 'Enable Zoom', type: 'boolean', defaultValue: true, description: 'Allows mouse scroll zooming.' },
      { name: 'maxPolarAngle', label: 'Max Polar Angle (Floor Clamp)', type: 'number', min: 0.5, max: 3.14, step: 0.1, defaultValue: 1.57, description: 'Prevents camera from sinking beneath y = 0.' }
    ],
    codeExample: (props) => `<OrbitControls
  enableDamping={${props.enableDamping}}
  dampingFactor={${props.dampingFactor}}
  autoRotate={${props.autoRotate}}
  autoRotateSpeed={${props.autoRotateSpeed}}
  enableZoom={${props.enableZoom}}
  maxPolarAngle={${props.maxPolarAngle}}
/>`
  },
  {
    id: 'transform-controls',
    name: 'TransformControls',
    r3fTag: '<TransformControls />',
    sourcePackage: '@react-three/drei',
    summary: 'Interactive 3D manipulation gizmo (Translate, Rotate, Scale) attached to any mesh.',
    description: 'Provides an in-viewport 3D gizmo widget with colorful $(X, Y, Z)$ axis handles that lets users visually drag to move, rotate, and scale 3D objects in real time, exactly like in Blender, Maya, or Unity.',
    features: [
      '3 Modes: "translate" (arrows), "rotate" (rings), "scale" (boxes)',
      'Snapping to grid units or angle increments',
      'Event callbacks: `onObjectChange`, `onMouseDown`, `onMouseUp`'
    ],
    controls: [
      { name: 'mode', label: 'Gizmo Mode', type: 'select', options: ['translate', 'rotate', 'scale'], defaultValue: 'translate', description: 'Active transformation tool handle.' },
      { name: 'size', label: 'Gizmo Size', type: 'number', min: 0.4, max: 2.0, step: 0.1, defaultValue: 1.0, description: 'Visual scale of the axis arrows/rings.' },
      { name: 'showX', label: 'Show X Axis (Red)', type: 'boolean', defaultValue: true, description: 'Toggle X axis widget.' },
      { name: 'showY', label: 'Show Y Axis (Green)', type: 'boolean', defaultValue: true, description: 'Toggle Y axis widget.' },
      { name: 'showZ', label: 'Show Z Axis (Blue)', type: 'boolean', defaultValue: true, description: 'Toggle Z axis widget.' }
    ],
    codeExample: (props) => `<TransformControls
  mode="${props.mode}"
  size={${props.size}}
  showX={${props.showX}}
  showY={${props.showY}}
  showZ={${props.showZ}}
>
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#ec4899" />
  </mesh>
</TransformControls>`
  },
  {
    id: 'presentation-controls',
    name: 'PresentationControls',
    r3fTag: '<PresentationControls />',
    sourcePackage: '@react-three/drei',
    summary: 'Spring-physics elastic showcase controller for slick product cards and portfolio viewers.',
    description: 'Constrains rotation to a realistic viewing window with natural spring-back tension. When the user releases the mouse, the object smoothly snaps back to its hero orientation. Perfect for Apple-style product presentations.',
    features: [
      'Elastic spring snap-back physics',
      'Configurable rotation angle polar & azimuth limits',
      'Configurable spring tension & mass'
    ],
    controls: [
      { name: 'snap', label: 'Snap Back to Origin', type: 'boolean', defaultValue: true, description: 'Elastic return on release.' },
      { name: 'speed', label: 'Interaction Speed', type: 'number', min: 0.5, max: 3.0, step: 0.1, defaultValue: 1.5, description: 'Drag sensitivity multiplier.' },
      { name: 'zoom', label: 'Zoom Scale Factor', type: 'number', min: 0.5, max: 2.0, step: 0.1, defaultValue: 1.0, description: 'Scale factor while dragging.' }
    ],
    codeExample: (props) => `<PresentationControls
  global
  snap={${props.snap}}
  speed={${props.speed}}
  zoom={${props.zoom}}
  polar={[-Math.PI / 4, Math.PI / 4]}
  azimuth={[-Math.PI / 3, Math.PI / 3]}
>
  <mesh>
    <roundedBoxGeometry args={[2, 1.2, 0.1]} />
    <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
  </mesh>
</PresentationControls>`
  },
  {
    id: 'scroll-controls',
    name: 'ScrollControls',
    r3fTag: '<ScrollControls />',
    sourcePackage: '@react-three/drei',
    summary: 'Synchronizes 3D scene camera animations and object timelines with native page scrolling.',
    description: 'Creates a virtual multi-page scroll container with dampening. Combined with `useScroll()`, you can drive keyframe animations, camera travel paths, and model disassembly based on the user’s scroll progress $(0.0 \\to 1.0)$.',
    features: [
      'Virtual scroll container without jank',
      '`pages` and `damping` controls',
      '`useScroll()` hook with `.offset`, `.range()`, and `.curve()` math helpers'
    ],
    controls: [
      { name: 'pages', label: 'Virtual Pages Count', type: 'number', min: 1, max: 5, step: 1, defaultValue: 3, description: 'Total scroll height in screen lengths.' },
      { name: 'damping', label: 'Scroll Damping', type: 'number', min: 0.05, max: 0.5, step: 0.05, defaultValue: 0.2, description: 'Smoothness inertia of the scroll.' }
    ],
    codeExample: (props) => `<Canvas>
  <ScrollControls pages={${props.pages}} damping={${props.damping}}>
    <SceneAnimation />
    <Scroll html>
      {/* Native HTML overlay headers that scroll alongside 3D */}
      <h1 style={{ position: 'absolute', top: '20vh' }}>Hero Title</h1>
      <h2 style={{ position: 'absolute', top: '120vh' }}>Features</h2>
      <h2 style={{ position: 'absolute', top: '220vh' }}>Contact</h2>
    </Scroll>
  </ScrollControls>
</Canvas>`
  }
];
