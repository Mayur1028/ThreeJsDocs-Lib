import { MaterialDef } from '../types';

export const materialsData: MaterialDef[] = [
  {
    id: 'mesh-standard-material',
    name: 'MeshStandardMaterial',
    tagline: 'Industry-standard Physically Based Rendering (PBR) metallic-roughness model.',
    description: 'The workhorse material in Three.js and R3F. It accurately calculates real-world light bounces, specular highlights, and ambient reflections based on surface roughness and metalness.',
    useCase: 'Best for realistic 3D objects: metals, plastics, painted surfaces, wood, ceramics, stone.',
    r3fTag: '<meshStandardMaterial />',
    threeClass: 'THREE.MeshStandardMaterial',
    category: 'Standard / PBR',
    pros: ['Realistic lighting response', 'Works with all Three.js light types', 'Supports normal, roughness, and metalness texture maps'],
    cons: ['More computationally expensive than MeshBasicMaterial or MeshPhongMaterial'],
    controls: [
      { name: 'color', label: 'Color', type: 'color', defaultValue: '#6366f1', description: 'Base diffuse surface color.' },
      { name: 'roughness', label: 'Roughness', type: 'number', min: 0, max: 1, step: 0.02, defaultValue: 0.25, description: '0.0 = mirror-like gloss, 1.0 = completely matte diffuse diffuse scattering.' },
      { name: 'metalness', label: 'Metalness', type: 'number', min: 0, max: 1, step: 0.02, defaultValue: 0.8, description: '0.0 = dielectric/non-metal (plastic/wood), 1.0 = pure metal (chrome/gold).' },
      { name: 'wireframe', label: 'Wireframe', type: 'boolean', defaultValue: false, description: 'Renders the triangle wireframe mesh geometry.' },
      { name: 'flatShading', label: 'Flat Shading', type: 'boolean', defaultValue: false, description: 'Renders low-poly faceted faces without vertex normal smoothing.' }
    ],
    codeExample: (props) => `<mesh>
  <sphereGeometry args={[1, 64, 64]} />
  <meshStandardMaterial
    color="${props.color}"
    roughness={${props.roughness}}
    metalness={${props.metalness}}${props.wireframe ? '\n    wireframe' : ''}${props.flatShading ? '\n    flatShading' : ''}
  />
</mesh>`
  },
  {
    id: 'mesh-physical-material',
    name: 'MeshPhysicalMaterial',
    tagline: 'Advanced PBR material with glass transmission, clearcoat, sheen, and iridescence.',
    description: 'An extension of MeshStandardMaterial that adds cutting-edge optical properties like real-world refractive transmission (frosted glass, diamonds, water), automotive clearcoat lacquer, velvet sheen, and soap-bubble iridescence.',
    useCase: 'Luxury automotive paint, transparent glass, gemstones, water bottles, iridescent shells, translucent plastics.',
    r3fTag: '<meshPhysicalMaterial />',
    threeClass: 'THREE.MeshPhysicalMaterial',
    category: 'Standard / PBR',
    pros: ['Ultra-realistic glass and liquids', 'Clearcoat layer simulation', 'Iridescence and sheen support'],
    cons: ['Heaviest standard Three.js material on the GPU'],
    controls: [
      { name: 'color', label: 'Base Color', type: 'color', defaultValue: '#ffffff', description: 'Material tint color.' },
      { name: 'roughness', label: 'Roughness', type: 'number', min: 0, max: 1, step: 0.02, defaultValue: 0.1, description: 'Surface micro-facet roughness.' },
      { name: 'transmission', label: 'Transmission', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.95, description: '0.0 = opaque, 1.0 = 100% optical glass/refraction.' },
      { name: 'thickness', label: 'Thickness', type: 'number', min: 0, max: 5, step: 0.1, defaultValue: 1.5, description: 'Volume thickness for light attenuation and internal refraction.' },
      { name: 'ior', label: 'Index of Refraction (IOR)', type: 'number', min: 1.0, max: 2.5, step: 0.05, defaultValue: 1.5, description: 'Optical refractive index (1.33 = water, 1.5 = glass, 2.4 = diamond).' },
      { name: 'clearcoat', label: 'Clearcoat', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 1.0, description: 'Adds an extra protective glossy specular layer over the base.' },
      { name: 'clearcoatRoughness', label: 'Clearcoat Rough', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.1, description: 'Roughness of the clearcoat top lacquer layer.' },
      { name: 'iridescence', label: 'Iridescence', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 0.4, description: 'Thin-film rainbow color interference effect (soap bubbles, beetles).' }
    ],
    codeExample: (props) => `<mesh>
  <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
  <meshPhysicalMaterial
    color="${props.color}"
    roughness={${props.roughness}}
    transmission={${props.transmission}}
    thickness={${props.thickness}}
    ior={${props.ior}}
    clearcoat={${props.clearcoat}}
    clearcoatRoughness={${props.clearcoatRoughness}}
    iridescence={${props.iridescence}}
  />
</mesh>`
  },
  {
    id: 'mesh-toon-material',
    name: 'MeshToonMaterial',
    tagline: 'Non-Photorealistic Rendering (NPR) Cel-shading / Anime aesthetic material.',
    description: 'Calculates shading in discrete cartoon bands rather than smooth gradients, producing an unmistakable comic book, anime, or retro arcade cel-shaded look.',
    useCase: 'Anime characters, stylized indie games, cartoon props, comic book illustrations.',
    r3fTag: '<meshToonMaterial />',
    threeClass: 'THREE.MeshToonMaterial',
    category: 'Special Effects',
    pros: ['Very stylized aesthetic', 'High performance on mobile GPUs', 'Supports custom gradient gradientMap textures'],
    cons: ['Does not support PBR roughness/metalness or environment reflections'],
    controls: [
      { name: 'color', label: 'Color', type: 'color', defaultValue: '#f43f5e', description: 'Base cel-shaded body color.' },
      { name: 'wireframe', label: 'Wireframe', type: 'boolean', defaultValue: false, description: 'Renders geometry wireframe lines.' }
    ],
    codeExample: (props) => `<mesh>
  <sphereGeometry args={[1, 32, 32]} />
  <meshToonMaterial
    color="${props.color}"${props.wireframe ? '\n    wireframe' : ''}
  />
</mesh>`
  },
  {
    id: 'mesh-normal-material',
    name: 'MeshNormalMaterial',
    tagline: 'Debug & stylistic material that maps surface normal vectors directly to RGB colors.',
    description: 'Visualizes the $(X, Y, Z)$ direction vector of each face/vertex directly as Red, Green, and Blue color channels (X -> Red, Y -> Green, Z -> Blue). Requires NO lights in the scene!',
    useCase: 'Debugging geometry normals, cyberpunk iridescent aesthetic, retro sci-fi interfaces.',
    r3fTag: '<meshNormalMaterial />',
    threeClass: 'THREE.MeshNormalMaterial',
    category: 'Technical / Shaders',
    pros: ['Requires zero lights to render', 'Extremely lightweight', 'Instantly reveals flipped face normals and geometry orientation'],
    cons: ['Color cannot be arbitrarily changed (strictly derived from normal vectors)'],
    controls: [
      { name: 'flatShading', label: 'Flat Shading', type: 'boolean', defaultValue: false, description: 'Highlights individual polygon faces distinctly.' },
      { name: 'wireframe', label: 'Wireframe', type: 'boolean', defaultValue: false, description: 'Displays vertex connections.' }
    ],
    codeExample: (props) => `<mesh>
  <torusKnotGeometry args={[0.8, 0.28, 120, 24]} />
  <meshNormalMaterial${props.flatShading ? '\n    flatShading' : ''}${props.wireframe ? '\n    wireframe' : ''}
  />
</mesh>`
  },
  {
    id: 'mesh-phong-material',
    name: 'MeshPhongMaterial',
    tagline: 'Classic Blinn-Phong specular reflection model for glossy plastic surfaces.',
    description: 'A non-PBR material that calculates lighting per-pixel using the classic Blinn-Phong equation. It produces distinct shiny specular highlights without requiring environment reflections.',
    useCase: 'Glossy plastic toys, billiard balls, retro 3D web games, fast mobile rendering.',
    r3fTag: '<meshPhongMaterial />',
    threeClass: 'THREE.MeshPhongMaterial',
    category: 'Standard / PBR',
    pros: ['Very fast rendering', 'Crisp controllable specular highlight color'],
    cons: ['Not physically accurate compared to PBR standard materials'],
    controls: [
      { name: 'color', label: 'Diffuse Color', type: 'color', defaultValue: '#3b82f6', description: 'Base body color.' },
      { name: 'specular', label: 'Specular Color', type: 'color', defaultValue: '#ffffff', description: 'Color of the shiny light reflection highlight.' },
      { name: 'shininess', label: 'Shininess', type: 'number', min: 0, max: 200, step: 5, defaultValue: 80, description: 'Tightness of the specular highlight spot (higher = sharper gloss).' }
    ],
    codeExample: (props) => `<mesh>
  <sphereGeometry args={[1, 64, 64]} />
  <meshPhongMaterial
    color="${props.color}"
    specular="${props.specular}"
    shininess={${props.shininess}}
  />
</mesh>`
  },
  {
    id: 'mesh-basic-material',
    name: 'MeshBasicMaterial',
    tagline: 'Flat, unlit material completely unaffected by lights and shadows.',
    description: 'Renders pure flat color or textures without any light calculation, shading, or shadows. Extremely fast (1 shader instruction).',
    useCase: 'Skyboxes, UI elements, wireframes, solid silhouettes, neon glow meshes before bloom postprocessing.',
    r3fTag: '<meshBasicMaterial />',
    threeClass: 'THREE.MeshBasicMaterial',
    category: 'Basic / Unlit',
    pros: ['Fastest possible Three.js material', 'Never affected by light placement or shadows'],
    cons: ['No 3D depth shading without textures or wireframe'],
    controls: [
      { name: 'color', label: 'Color', type: 'color', defaultValue: '#10b981', description: 'Solid unlit color.' },
      { name: 'wireframe', label: 'Wireframe', type: 'boolean', defaultValue: true, description: 'Renders the triangle wireframe lines.' },
      { name: 'transparent', label: 'Transparent', type: 'boolean', defaultValue: false, description: 'Enables opacity blending.' },
      { name: 'opacity', label: 'Opacity', type: 'number', min: 0, max: 1, step: 0.05, defaultValue: 1.0, description: 'Alpha transparency (requires transparent={true}).' }
    ],
    codeExample: (props) => `<mesh>
  <dodecahedronGeometry args={[1, 0]} />
  <meshBasicMaterial
    color="${props.color}"${props.wireframe ? '\n    wireframe' : ''}${props.transparent ? `\n    transparent\n    opacity={${props.opacity}}` : ''}
  />
</mesh>`
  }
];
