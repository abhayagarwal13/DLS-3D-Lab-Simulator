import { Html, RoundedBox, Text } from '@react-three/drei';

export default function TeacherSpawn({ visible }) {
  if (!visible) return null;

  return (
    <group position={[-3.75, 0.02, 0.68]} rotation={[0, 0.55, 0]}>
      {/* Replace this placeholder AI teacher with /public/models/ai-teacher-avatar.glb using useGLTF later. */}
      <mesh castShadow position={[0, 1.05, 0]}>
        <capsuleGeometry args={[0.22, 0.7, 8, 24]} />
        <meshStandardMaterial color="#08baa7" roughness={0.36} metalness={0.12} />
      </mesh>
      <mesh castShadow position={[0, 1.66, 0]}>
        <sphereGeometry args={[0.22, 28, 18]} />
        <meshStandardMaterial color="#dffaff" roughness={0.18} metalness={0.16} />
      </mesh>
      <mesh castShadow position={[0, 1.91, 0]}>
        <sphereGeometry args={[0.23, 24, 16]} />
        <meshStandardMaterial color="#10242c" roughness={0.32} metalness={0.42} />
      </mesh>
      <RoundedBox args={[0.5, 0.18, 0.05]} radius={0.025} position={[0, 1.65, 0.22]}>
        <meshStandardMaterial color="#07151c" emissive="#0b4a55" emissiveIntensity={0.35} roughness={0.22} />
      </RoundedBox>
      <Text position={[0, 1.65, 0.252]} fontSize={0.05} color="#73e2ff" anchorX="center">
        AI
      </Text>
      <Html transform position={[0.08, 2.18, 0]} distanceFactor={7}>
        <div className="teacher-badge">AI Teacher Online</div>
      </Html>
    </group>
  );
}
