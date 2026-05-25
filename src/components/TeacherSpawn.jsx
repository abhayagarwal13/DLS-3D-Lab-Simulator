import { useEffect } from 'react';
import { Html, RoundedBox, Text, useGLTF } from '@react-three/drei';

function AITeacherAvatar() {
  const { scene } = useGLTF('./models/ai-teacher-avatar.glb');

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

  return <primitive object={scene} scale={0.72} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />;
}

export default function TeacherSpawn({ visible }) {
  if (!visible) return null;

  return (
    <group position={[-3.75, 0.02, 0.68]} rotation={[0, 0.55, 0]}>
      {/* AI teacher base model: public/models/ai-teacher-avatar.glb.
          Replace this file with a higher-detail science teacher GLB later and keep the same path. */}
      <AITeacherAvatar />

      {/* Procedural science-teacher details layered over the downloaded GLB. */}
      <RoundedBox args={[0.54, 0.88, 0.11]} radius={0.035} position={[0, 1.04, 0.08]}>
        <meshStandardMaterial color="#f6fbfb" roughness={0.42} metalness={0.02} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.78, 0.09]} radius={0.03} position={[-0.34, 1.02, 0.05]} rotation={[0, 0, -0.16]}>
        <meshStandardMaterial color="#f4f8f8" roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.78, 0.09]} radius={0.03} position={[0.34, 1.02, 0.05]} rotation={[0, 0, 0.16]}>
        <meshStandardMaterial color="#f4f8f8" roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[0.19, 0.52, 0.03]} radius={0.015} position={[-0.12, 1.24, 0.15]} rotation={[0, 0, -0.24]}>
        <meshStandardMaterial color="#d9f7f4" roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[0.19, 0.52, 0.03]} radius={0.015} position={[0.12, 1.24, 0.15]} rotation={[0, 0, 0.24]}>
        <meshStandardMaterial color="#d9f7f4" roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.06, 0.03]} radius={0.012} position={[0, 1.39, 0.17]}>
        <meshStandardMaterial color="#09b9a8" roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.26, 0.18, 0.035]} radius={0.018} position={[0.18, 0.92, 0.18]} rotation={[0, -0.12, 0]}>
        <meshStandardMaterial color="#142734" emissive="#0b5562" emissiveIntensity={0.16} roughness={0.24} metalness={0.2} />
      </RoundedBox>
      <Text position={[0.18, 0.92, 0.205]} fontSize={0.035} color="#8ff5ff" anchorX="center" anchorY="middle">
        DLS
      </Text>
      <group position={[0, 1.58, 0.22]}>
        <mesh castShadow position={[-0.08, 0, 0]}>
          <torusGeometry args={[0.055, 0.007, 8, 20]} />
          <meshStandardMaterial color="#10242c" roughness={0.2} metalness={0.45} />
        </mesh>
        <mesh castShadow position={[0.08, 0, 0]}>
          <torusGeometry args={[0.055, 0.007, 8, 20]} />
          <meshStandardMaterial color="#10242c" roughness={0.2} metalness={0.45} />
        </mesh>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 0.01, 0.012]} />
          <meshStandardMaterial color="#10242c" roughness={0.2} metalness={0.45} />
        </mesh>
      </group>

      <RoundedBox args={[0.5, 0.18, 0.05]} radius={0.025} position={[0, 1.82, 0.2]}>
        <meshStandardMaterial color="#07151c" emissive="#0b4a55" emissiveIntensity={0.35} roughness={0.22} />
      </RoundedBox>
      <Text position={[0, 1.82, 0.232]} fontSize={0.05} color="#73e2ff" anchorX="center">
        AI TEACHER
      </Text>
      <Html transform position={[0.08, 2.18, 0]} distanceFactor={7}>
        <div className="teacher-badge">AI Teacher Online</div>
      </Html>
    </group>
  );
}

useGLTF.preload('./models/ai-teacher-avatar.glb');
