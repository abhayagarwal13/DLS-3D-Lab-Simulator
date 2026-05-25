import { Suspense, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const aiTeacherModelUrl = new URL('../models/ai-teacher-avatar.glb', import.meta.url).href;

function AITeacherAvatar() {
  const { scene } = useGLTF(aiTeacherModelUrl);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness ?? 0.45, 0.5);
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.92} position={[0, 0.02, -0.03]} rotation={[0, 0, 0]} />;
}

export default function TeacherSpawn({ visible }) {
  if (!visible) return null;

  return (
    <group position={[-2.55, 0.02, 1.45]} rotation={[0, -0.35, 0]}>
      {/* AI teacher base model: public/models/ai-teacher-avatar.glb.
          Replace this file with a higher-detail science teacher GLB later and keep the same path. */}
      <Suspense fallback={null}>
        <AITeacherAvatar />
      </Suspense>
    </group>
  );
}

useGLTF.preload(aiTeacherModelUrl);
