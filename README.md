# Daily Life Science 3D Lab Simulator MVP

Browser-based React + Vite + Three.js lab simulator for a Daily Life Science density lab.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173`.

## Build

```bash
npm run build
```

## Asset replacement notes

This MVP uses premium-looking procedural geometry so it works without paid models. To replace placeholders with free GLB/GLTF assets, place files in:

```text
public/models/
```

Then load them inside the component comments marked with `useGLTF`, for example:

```jsx
import { useGLTF } from '@react-three/drei';

const microscope = useGLTF('/models/microscope.glb');
return <primitive object={microscope.scene} />;
```

Good future model targets:

- `/public/models/microscope.glb`
- `/public/models/glassware.glb`
- `/public/models/teacher-avatar.glb`
- `/public/models/lab-bench.glb`

All current dependencies are free/open-source browser packages. Unity and paid services are not used.
