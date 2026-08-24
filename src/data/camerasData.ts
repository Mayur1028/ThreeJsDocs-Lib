import { CameraDef } from '../types';

export const camerasData: CameraDef[] = [
  {
    id: 'perspective-camera',
    name: 'PerspectiveCamera',
    r3fTag: '<PerspectiveCamera />',
    threeClass: 'THREE.PerspectiveCamera',
    summary: 'Mimics human eye vision with natural depth perspective (objects further away appear smaller).',
    description: 'The standard 3D camera projection used in virtually all 3D games, animations, and product viewers. It constructs a viewing frustum (pyramid with its top cut off) defined by Field of View (FOV), aspect ratio, near clipping plane, and far clipping plane.',
    useCase: '3D games, realistic architectural walkthroughs, product viewers, cinematic animations.',
    keyDifferences: [
      'Objects shrink as their distance from the camera increases (foreshortening).',
      'Uses FOV (Field of View in vertical degrees).',
      'Natural depth perception and perspective parallax.'
    ],
    controls: [
      { name: 'fov', label: 'Field of View (FOV °)', type: 'number', min: 20, max: 110, step: 5, defaultValue: 50, description: 'Vertical field of view in degrees (50° is standard, 90°+ is fish-eye).' },
      { name: 'near', label: 'Near Clipping Plane', type: 'number', min: 0.01, max: 5, step: 0.1, defaultValue: 0.1, description: 'Objects closer than this distance are clipped/invisible.' },
      { name: 'far', label: 'Far Clipping Plane', type: 'number', min: 10, max: 1000, step: 10, defaultValue: 100, description: 'Objects further than this distance are clipped/invisible.' },
      { name: 'zoom', label: 'Zoom Level', type: 'number', min: 0.5, max: 3, step: 0.1, defaultValue: 1.0, description: 'Optical magnification factor.' }
    ],
    codeExample: (props) => `<PerspectiveCamera
  makeDefault
  position={[0, 2, 5]}
  fov={${props.fov}}
  near={${props.near}}
  far={${props.far}}
  zoom={${props.zoom}}
/>`
  },
  {
    id: 'orthographic-camera',
    name: 'OrthographicCamera',
    r3fTag: '<OrthographicCamera />',
    threeClass: 'THREE.OrthographicCamera',
    summary: 'Parallel projection without perspective distortion (objects stay the exact same size regardless of distance).',
    description: 'In an Orthographic camera, parallel lines in 3D space remain strictly parallel on the 2D screen. There is zero perspective foreshortening. Commonly used for technical CAD drawings, 2D/2.5D isometric games (like Monument Valley, SimCity), and flat UI overlays.',
    useCase: 'Isometric games, 2D canvas overlays, CAD blueprint schematics, data visualization charts.',
    keyDifferences: [
      'Objects do NOT shrink with distance.',
      'Frustum is a rectangular box instead of a pyramid.',
      'Controlled by bounding planes (left, right, top, bottom) and zoom factor rather than FOV.'
    ],
    controls: [
      { name: 'zoom', label: 'Isometric Zoom', type: 'number', min: 40, max: 200, step: 10, defaultValue: 90, description: 'Magnification scale for orthographic projection.' },
      { name: 'near', label: 'Near Plane', type: 'number', min: -50, max: 10, step: 1, defaultValue: -20, description: 'Near clipping distance.' },
      { name: 'far', label: 'Far Plane', type: 'number', min: 20, max: 500, step: 10, defaultValue: 100, description: 'Far clipping distance.' }
    ],
    codeExample: (props) => `<OrthographicCamera
  makeDefault
  position={[5, 5, 5]}
  zoom={${props.zoom}}
  near={${props.near}}
  far={${props.far}}
/>`
  },
  {
    id: 'cube-camera',
    name: 'CubeCamera',
    r3fTag: '<CubeCamera />',
    threeClass: 'THREE.CubeCamera',
    summary: '6-sided camera rig that renders dynamic real-time reflections of the surrounding 3D environment.',
    description: 'Creates 6 sub-cameras pointing along $\\pm X, \\pm Y, \\pm Z$ to generate a live WebGLRenderTargetCube texture. Used to give shiny chrome or glass objects real-time reflections of moving surrounding objects in the scene.',
    useCase: 'Dynamic real-time chrome/mirror reflections, shiny cars reflecting nearby geometry, live environment probes.',
    keyDifferences: [
      'Renders the entire scene 6 times per frame (heavy on GPU; use with `frames={1}` or throttled updates).',
      'Provides a live `texture` output to pass into `material.envMap`.'
    ],
    controls: [
      { name: 'resolution', label: 'Texture Resolution', type: 'select', options: ['128', '256', '512'], defaultValue: '256', description: 'Pixel size of each cube face.' },
      { name: 'frames', label: 'Render Frames', type: 'select', options: ['1 (Static/On Mount)', 'Infinity (Realtime 60fps)'], defaultValue: 'Infinity (Realtime 60fps)', description: 'How frequently the reflection texture refreshes.' }
    ],
    codeExample: (props) => `<CubeCamera resolution={${props.resolution}} frames={${props.frames.includes('1') ? 1 : Infinity}}>
  {(texture) => (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial roughness={0.05} metalness={0.95} envMap={texture} />
    </mesh>
  )}
</CubeCamera>`
  }
];
