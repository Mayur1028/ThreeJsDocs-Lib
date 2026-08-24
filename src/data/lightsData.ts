import { LightDef } from '../types';

export const lightsData: LightDef[] = [
  {
    id: 'directional-light',
    name: 'DirectionalLight',
    r3fTag: '<directionalLight />',
    threeClass: 'THREE.DirectionalLight',
    summary: 'Parallel light rays emitted from infinitely far away (like direct Sunlight).',
    description: 'Simulates the Sun. All emitted light rays travel in the exact same parallel direction toward the target. This is the primary light source used for casting crisp real-time 3D shadows across wide outdoor or studio scenes.',
    useCase: 'Sunlight, moonbeam, primary key light in product showcases, real-time shadow casting.',
    hasHelper: true,
    supportsShadows: true,
    tips: [
      'Always position the light: `position={[5, 10, 7]}` and optionally set its `.target`.',
      'To enable shadows, add `castShadow` to the light and `shadow-mapSize={[1024, 1024]}`.',
      'Directional lights use an Orthographic shadow camera frustum.'
    ],
    controls: [
      { name: 'color', label: 'Light Color', type: 'color', defaultValue: '#ffffff', description: 'Color of the emitted light.' },
      { name: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 10, step: 0.2, defaultValue: 2.5, description: 'Brightness multiplier of the light.' },
      { name: 'posX', label: 'Position X', type: 'number', min: -10, max: 10, step: 0.5, defaultValue: 4, description: 'X coordinate of the light source.' },
      { name: 'posY', label: 'Position Y', type: 'number', min: 1, max: 15, step: 0.5, defaultValue: 6, description: 'Y coordinate (height) of the light source.' },
      { name: 'posZ', label: 'Position Z', type: 'number', min: -10, max: 10, step: 0.5, defaultValue: 4, description: 'Z coordinate of the light source.' },
      { name: 'castShadow', label: 'Cast Shadows', type: 'boolean', defaultValue: true, description: 'Enables real-time dynamic shadow map generation.' }
    ],
    codeExample: (props) => `<directionalLight
  position={[${props.posX}, ${props.posY}, ${props.posZ}]}
  intensity={${props.intensity}}
  color="${props.color}"${props.castShadow ? '\n  castShadow\n  shadow-mapSize={[1024, 1024]}' : ''}
/>`
  },
  {
    id: 'ambient-light',
    name: 'AmbientLight',
    r3fTag: '<ambientLight />',
    threeClass: 'THREE.AmbientLight',
    summary: 'Omnidirectional background light that illuminates all scene objects equally.',
    description: 'Provides a base level of illumination to prevent shadows from appearing 100% pitch-black. It has no position, no direction, and CANNOT cast shadows.',
    useCase: 'Softening harsh dark shadows, setting the base mood color of a scene, atmospheric tinting.',
    hasHelper: false,
    supportsShadows: false,
    tips: [
      'Keep intensity subtle (0.2 - 0.7). High ambient light washes out 3D contrast and makes models look flat.',
      'AmbientLight has no origin point, so `position` props have zero effect.'
    ],
    controls: [
      { name: 'color', label: 'Color', type: 'color', defaultValue: '#93c5fd', description: 'Ambient color tint.' },
      { name: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 3, step: 0.1, defaultValue: 0.8, description: 'Overall ambient brightness level.' }
    ],
    codeExample: (props) => `<ambientLight
  color="${props.color}"
  intensity={${props.intensity}}
/>`
  },
  {
    id: 'point-light',
    name: 'PointLight',
    r3fTag: '<pointLight />',
    threeClass: 'THREE.PointLight',
    summary: 'Light emitted from a single 3D point in all directions (like a lightbulb or campfire).',
    description: 'Radiates light spherically outward from a single coordinate point. Light intensity naturally decays (attenuates) over distance according to the inverse-square law.',
    useCase: 'Lightbulbs, torches, glowing magic orbs, neon signs, sparks, laser blasts.',
    hasHelper: true,
    supportsShadows: true,
    tips: [
      'Use `decay={2}` for physically accurate real-world light attenuation.',
      'PointLight shadows require rendering the scene 6 times into a CubeMap, so use point light shadows sparingly.'
    ],
    controls: [
      { name: 'color', label: 'Color', type: 'color', defaultValue: '#f59e0b', description: 'Point light hue.' },
      { name: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 20, step: 0.5, defaultValue: 8.0, description: 'Light power.' },
      { name: 'distance', label: 'Max Distance', type: 'number', min: 0, max: 25, step: 1, defaultValue: 15, description: 'Maximum reach of the light (0 = infinite range).' },
      { name: 'decay', label: 'Decay Rate', type: 'number', min: 0, max: 4, step: 0.2, defaultValue: 2.0, description: 'Falloff rate over distance (2.0 is physically correct).' },
      { name: 'posX', label: 'Position X', type: 'number', min: -8, max: 8, step: 0.5, defaultValue: 0, description: 'X position of the point light source.' },
      { name: 'posY', label: 'Position Y', type: 'number', min: 0.5, max: 8, step: 0.5, defaultValue: 2.5, description: 'Height Y of the point light.' },
      { name: 'posZ', label: 'Position Z', type: 'number', min: -8, max: 8, step: 0.5, defaultValue: 2, description: 'Z depth of the point light.' }
    ],
    codeExample: (props) => `<pointLight
  position={[${props.posX}, ${props.posY}, ${props.posZ}]}
  color="${props.color}"
  intensity={${props.intensity}}
  distance={${props.distance}}
  decay={${props.decay}}
/>`
  },
  {
    id: 'spot-light',
    name: 'SpotLight',
    r3fTag: '<spotLight />',
    threeClass: 'THREE.SpotLight',
    summary: 'Conical light emitted in a specific direction (like a flashlight or stage spotlight).',
    description: 'Projects a cone of light with customizable beam angle, edge softness (penumbra), distance limit, and direction vector.',
    useCase: 'Flashlights, stage lighting, gallery artwork spotlights, dramatic cinematic film lighting.',
    hasHelper: true,
    supportsShadows: true,
    tips: [
      'Increase `penumbra` (0.4 - 1.0) to achieve smooth, feather-soft cone edges.',
      'Spot lights cast perspective-camera shadows, creating realistic dramatic shadows.'
    ],
    controls: [
      { name: 'color', label: 'Color', type: 'color', defaultValue: '#a855f7', description: 'Spotlight color.' },
      { name: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 25, step: 1, defaultValue: 12, description: 'Power of the beam.' },
      { name: 'angle', label: 'Beam Angle (rad)', type: 'number', min: 0.1, max: 1.5, step: 0.05, defaultValue: 0.6, description: 'Spread width of the light cone.' },
      { name: 'penumbra', label: 'Penumbra (Softness)', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.8, description: 'Percentage of the spotlight cone that is attenuated/feathered.' },
      { name: 'posX', label: 'Position X', type: 'number', min: -10, max: 10, step: 0.5, defaultValue: 3, description: 'X position of the spotlight.' },
      { name: 'posY', label: 'Position Y', type: 'number', min: 2, max: 12, step: 0.5, defaultValue: 6, description: 'Height Y of the spotlight.' },
      { name: 'posZ', label: 'Position Z', type: 'number', min: -10, max: 10, step: 0.5, defaultValue: 4, description: 'Z depth of the spotlight.' }
    ],
    codeExample: (props) => `<spotLight
  position={[${props.posX}, ${props.posY}, ${props.posZ}]}
  angle={${props.angle}}
  penumbra={${props.penumbra}}
  intensity={${props.intensity}}
  color="${props.color}"
  castShadow
/>`
  },
  {
    id: 'hemisphere-light',
    name: 'HemisphereLight',
    r3fTag: '<hemisphereLight />',
    threeClass: 'THREE.HemisphereLight',
    summary: 'Two-color gradient light representing Sky Color from above and Ground Bounce from below.',
    description: 'Simulates outdoor environmental ambient light where the sky above is bright blue/white and the earth/grass below reflects a warm green/brown tone upward.',
    useCase: 'Outdoor landscapes, open world lighting, natural environmental balance.',
    hasHelper: false,
    supportsShadows: false,
    tips: [
      'Set `color` to a sky tone (e.g. #87ceeb) and `groundColor` to an earth tone (e.g. #3d2817).'
    ],
    controls: [
      { name: 'skyColor', label: 'Sky Color (Top)', type: 'color', defaultValue: '#38bdf8', description: 'Color coming from the sky above.' },
      { name: 'groundColor', label: 'Ground Color (Bottom)', type: 'color', defaultValue: '#334155', description: 'Color bouncing from the ground below.' },
      { name: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 3, step: 0.1, defaultValue: 1.0, description: 'Light intensity.' }
    ],
    codeExample: (props) => `<hemisphereLight
  color="${props.skyColor}"
  groundColor="${props.groundColor}"
  intensity={${props.intensity}}
/>`
  }
];
