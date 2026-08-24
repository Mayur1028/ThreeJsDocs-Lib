export type NavigationSection = 
  | 'home'
  | 'qna'
  | 'materials'
  | 'lights'
  | 'cameras'
  | 'controllers'
  | 'library'
  | 'component-detail'
  | 'sandbox'
  | 'architecture';

export interface QnAItem {
  id: string;
  category: 'Fundamentals' | 'R3F Core' | 'Hooks & Lifecycle' | 'Materials & Shaders' | 'Performance & Best Practices';
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  interactiveDemoType?: 'coordinates' | 'scenegraph' | 'frustum' | 'drawcalls' | 'none';
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface MaterialPropertyControl {
  name: string;
  label: string;
  type: 'number' | 'color' | 'boolean' | 'select';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: any;
  description: string;
  options?: string[];
}

export interface MaterialDef {
  id: string;
  name: string;
  tagline: string;
  description: string;
  useCase: string;
  r3fTag: string;
  threeClass: string;
  category: 'Standard / PBR' | 'Special Effects' | 'Basic / Unlit' | 'Technical / Shaders';
  controls: MaterialPropertyControl[];
  docsLink?: string;
  pros: string[];
  cons: string[];
  codeExample: (props: Record<string, any>) => string;
}

export interface LightDef {
  id: string;
  name: string;
  r3fTag: string;
  threeClass: string;
  summary: string;
  description: string;
  useCase: string;
  hasHelper: boolean;
  supportsShadows: boolean;
  controls: MaterialPropertyControl[];
  tips: string[];
  codeExample: (props: Record<string, any>) => string;
}

export interface CameraDef {
  id: string;
  name: string;
  r3fTag: string;
  threeClass: string;
  summary: string;
  description: string;
  useCase: string;
  controls: MaterialPropertyControl[];
  keyDifferences: string[];
  codeExample: (props: Record<string, any>) => string;
}

export interface ControllerDef {
  id: string;
  name: string;
  r3fTag: string;
  sourcePackage: string;
  summary: string;
  description: string;
  controls: MaterialPropertyControl[];
  features: string[];
  codeExample: (props: Record<string, any>) => string;
}

export interface CustomComponentMeta {
  id: string;
  title: string;
  tagline: string;
  category: 'Shaders & Effects' | 'Particles' | 'UI & 3D Cards' | 'Procedural & Math' | 'Physics & Interaction';
  author: string;
  dateAdded: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  description: string;
  features: string[];
  propsDoc: Array<{
    name: string;
    type: string;
    defaultValue: string;
    description: string;
  }>;
  componentCode: string;
  usageCode: string;
  shaderCode?: {
    vertex?: string;
    fragment?: string;
  };
  controls: MaterialPropertyControl[];
}
