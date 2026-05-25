import { Float, Html, RoundedBox, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Bench({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  return (
    <group position={position} scale={scale}>
      <RoundedBox castShadow receiveShadow args={[3.42, 0.26, 1.22]} radius={0.05} position={[0, 0.97, 0]}>
        <meshStandardMaterial color="#dfe8eb" roughness={0.25} metalness={0.08} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[3.24, 0.09, 1.04]} radius={0.035} position={[0, 1.15, 0]}>
        <meshStandardMaterial color="#151e24" roughness={0.14} metalness={0.36} />
      </RoundedBox>
      <mesh castShadow receiveShadow position={[0, 0.82, 0.56]}>
        <boxGeometry args={[3.1, 0.58, 0.07]} />
        <meshStandardMaterial color="#f5f8f9" roughness={0.34} />
      </mesh>
      {[-0.9, 0, 0.9].map((x) => (
        <mesh key={x} castShadow receiveShadow position={[x, 0.82, 0.6]}>
          <boxGeometry args={[0.78, 0.42, 0.055]} />
          <meshStandardMaterial color="#d6e0e4" roughness={0.3} metalness={0.05} />
        </mesh>
      ))}
      {[-1.35, 1.35].map((x) =>
        [-0.38, 0.38].map((z) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, 0.5, z]}>
            <boxGeometry args={[0.12, 1, 0.12]} />
            <meshStandardMaterial color="#9aa8af" roughness={0.24} metalness={0.72} />
          </mesh>
        )),
      )}
      <mesh castShadow position={[-0.72, 1.25, 0]}>
        <torusGeometry args={[0.12, 0.018, 12, 36]} />
        <meshStandardMaterial color="#4ab7d9" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh castShadow position={[-0.72, 1.22, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.34, 16]} />
        <meshStandardMaterial color="#bed5dc" roughness={0.22} metalness={0.65} />
      </mesh>
    </group>
  );
}

function BackCounters() {
  return (
    <group position={[0, 0, -4.44]}>
      <RoundedBox castShadow receiveShadow args={[8.8, 0.82, 0.72]} radius={0.045} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#e8eff2" roughness={0.32} metalness={0.05} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[9.05, 0.11, 0.82]} radius={0.025} position={[0, 0.96, 0.02]}>
        <meshStandardMaterial color="#17242b" roughness={0.16} metalness={0.34} />
      </RoundedBox>
      {[-3.45, -2.3, -1.15, 0, 1.15, 2.3, 3.45].map((x) => (
        <group key={x}>
          <mesh castShadow receiveShadow position={[x, 0.48, 0.38]}>
            <boxGeometry args={[0.95, 0.55, 0.06]} />
            <meshStandardMaterial color="#f7fafb" roughness={0.28} />
          </mesh>
          <mesh castShadow position={[x, 0.54, 0.415]}>
            <boxGeometry args={[0.16, 0.035, 0.025]} />
            <meshStandardMaterial color="#91a3aa" roughness={0.2} metalness={0.65} />
          </mesh>
        </group>
      ))}
      {[-3.5, -2.1, -0.7, 0.7, 2.1, 3.5].map((x) => (
        <group key={x} position={[x, 2.76, 0.03]}>
          <RoundedBox castShadow receiveShadow args={[1.08, 0.82, 0.42]} radius={0.035}>
            <meshStandardMaterial color="#edf5f7" roughness={0.3} />
          </RoundedBox>
          <mesh castShadow position={[0, -0.02, 0.225]}>
            <boxGeometry args={[0.04, 0.68, 0.025]} />
            <meshStandardMaterial color="#c2d0d5" roughness={0.34} />
          </mesh>
          <mesh castShadow position={[0.34, -0.02, 0.245]}>
            <boxGeometry args={[0.12, 0.03, 0.025]} />
            <meshStandardMaterial color="#7f929a" roughness={0.18} metalness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh castShadow position={[-4.05, 1.2, 0.35]}>
        <cylinderGeometry args={[0.09, 0.07, 0.36, 24]} />
        <meshPhysicalMaterial color="#dffaff" transparent opacity={0.52} roughness={0.04} transmission={0.35} />
      </mesh>
      <mesh castShadow position={[4.05, 1.2, 0.35]}>
        <boxGeometry args={[0.42, 0.3, 0.28]} />
        <meshStandardMaterial color="#252f35" roughness={0.2} metalness={0.22} />
      </mesh>
    </group>
  );
}

function Microscope({ position }) {
  return (
    <group position={position} rotation={[0, -0.45, 0]}>
      {/* Replace this procedural microscope with /public/models/microscope.glb using useGLTF later. */}
      <RoundedBox castShadow receiveShadow args={[0.62, 0.08, 0.42]} radius={0.035} position={[0, 0.06, 0]}>
        <meshStandardMaterial color="#111920" roughness={0.28} metalness={0.3} />
      </RoundedBox>
      <RoundedBox castShadow args={[0.34, 0.045, 0.28]} radius={0.018} position={[0.05, 0.25, 0]}>
        <meshStandardMaterial color="#f1f5f6" roughness={0.2} metalness={0.2} />
      </RoundedBox>
      <mesh castShadow position={[-0.12, 0.32, 0]}>
        <cylinderGeometry args={[0.055, 0.065, 0.55, 22]} />
        <meshStandardMaterial color="#e8edef" roughness={0.22} metalness={0.25} />
      </mesh>
      <mesh castShadow position={[0.02, 0.54, 0]} rotation={[0, 0, -0.48]}>
        <torusGeometry args={[0.32, 0.045, 18, 44, Math.PI * 1.05]} />
        <meshStandardMaterial color="#f7fafb" roughness={0.18} metalness={0.28} />
      </mesh>
      <mesh castShadow position={[0.16, 0.69, 0.02]} rotation={[0.72, 0, 0.42]}>
        <cylinderGeometry args={[0.07, 0.082, 0.58, 28]} />
        <meshStandardMaterial color="#172129" roughness={0.18} metalness={0.35} />
      </mesh>
      <mesh castShadow position={[0.28, 0.98, 0.1]} rotation={[0.72, 0, 0.42]}>
        <cylinderGeometry args={[0.09, 0.09, 0.2, 28]} />
        <meshStandardMaterial color="#0b1217" roughness={0.18} metalness={0.48} />
      </mesh>
      <mesh castShadow position={[0.12, 0.4, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 30]} />
        <meshStandardMaterial color="#202b32" roughness={0.18} metalness={0.36} />
      </mesh>
      <mesh castShadow position={[0.14, 0.43, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.045, 0.18, 18]} />
        <meshStandardMaterial color="#f4f7f8" roughness={0.2} metalness={0.2} />
      </mesh>
      {[-0.21, 0.27].map((x) => (
        <mesh key={x} castShadow position={[x, 0.15, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.035, 20]} />
          <meshStandardMaterial color="#25343d" roughness={0.18} metalness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function Glassware({ position }) {
  return (
    <group position={position}>
      {/* Swap these primitives for free GLB glassware in /public/models/glassware.glb. */}
      {[0, 0.34, 0.68].map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow position={[0, 0.23 + i * 0.025, 0]}>
            <cylinderGeometry args={[0.13 + i * 0.02, 0.1, 0.44 + i * 0.06, 40, 1, true]} />
            <meshPhysicalMaterial
              color={i === 1 ? '#9feaff' : '#e5fbff'}
              roughness={0.02}
              transmission={0.42}
              transparent
              opacity={0.42}
              thickness={0.07}
              metalness={0}
            />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.1 + i * 0.018, 0.095, 0.14 + i * 0.04, 32]} />
            <meshStandardMaterial color={i === 2 ? '#a5e76e' : '#37b6e5'} transparent opacity={0.54} roughness={0.06} />
          </mesh>
          <mesh position={[0, 0.47 + i * 0.05, 0]}>
            <torusGeometry args={[0.13 + i * 0.02, 0.009, 10, 32]} />
            <meshPhysicalMaterial color="#f4feff" roughness={0.01} transparent opacity={0.48} transmission={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function TestTubeRack({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox castShadow receiveShadow args={[0.98, 0.1, 0.34]} radius={0.025} position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#dce7ea" roughness={0.26} metalness={0.12} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[0.98, 0.08, 0.34]} radius={0.02} position={[0, 0.34, 0]}>
        <meshStandardMaterial color="#f1f7f8" roughness={0.22} metalness={0.08} />
      </RoundedBox>
      {[-0.34, -0.17, 0, 0.17, 0.34].map((x, index) => (
        <group key={x} position={[x, 0.24, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.46, 20, 1, true]} />
            <meshPhysicalMaterial color="#e9fcff" roughness={0.02} transparent opacity={0.42} transmission={0.36} thickness={0.05} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.16 + index * 0.02, 18]} />
            <meshStandardMaterial
              color={['#58c8ff', '#ffcf62', '#8fe36d', '#ff8da1', '#bba5ff'][index]}
              roughness={0.08}
              transparent
              opacity={0.72}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function LabBottles({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {[0, 0.26, 0.52].map((x, index) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.085, 0.09, 0.36, 26]} />
            <meshPhysicalMaterial color={['#dffaff', '#ffeec0', '#d6ffd0'][index]} roughness={0.03} transparent opacity={0.48} transmission={0.28} thickness={0.08} />
          </mesh>
          <mesh castShadow position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.045, 0.055, 0.18, 22]} />
            <meshPhysicalMaterial color="#eafcff" roughness={0.02} transparent opacity={0.44} transmission={0.3} />
          </mesh>
          <mesh castShadow position={[0, 0.54, 0]}>
            <cylinderGeometry args={[0.052, 0.052, 0.055, 20]} />
            <meshStandardMaterial color={['#3bb7e4', '#e1a73d', '#78c95f'][index]} roughness={0.18} metalness={0.18} />
          </mesh>
          <RoundedBox args={[0.13, 0.08, 0.012]} radius={0.004} position={[0, 0.22, 0.087]}>
            <meshStandardMaterial color="#f7fbfc" roughness={0.32} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

function TabletConsole({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox castShadow receiveShadow args={[0.74, 0.04, 0.5]} radius={0.045}>
        <meshStandardMaterial color="#101820" roughness={0.2} metalness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.012, 0.38]} radius={0.025} position={[0, 0.028, 0]}>
        <meshStandardMaterial color="#07151c" emissive="#0b3b4a" emissiveIntensity={0.42} roughness={0.16} />
      </RoundedBox>
      <Text position={[0, 0.038, -0.02]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.045} color="#83e7ff" anchorX="center">
        DLS Lab Data
      </Text>
      <mesh position={[-0.17, 0.04, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.18, 0.018, 0.006]} />
        <meshStandardMaterial color="#95e67d" emissive="#467a3a" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.12, 0.04, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.28, 0.018, 0.006]} />
        <meshStandardMaterial color="#72e6ff" emissive="#245a66" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function SafetyGear({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox castShadow args={[0.46, 0.12, 0.18]} radius={0.06} position={[0, 0.08, 0]}>
        <meshPhysicalMaterial color="#dff9ff" roughness={0.04} transparent opacity={0.38} transmission={0.28} />
      </RoundedBox>
      {[-0.29, 0.29].map((x) => (
        <mesh key={x} castShadow position={[x, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.014, 10, 28]} />
          <meshStandardMaterial color="#2d3a42" roughness={0.2} metalness={0.3} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.02, -0.26]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[0.54, 0.035, 0.38]} />
        <meshStandardMaterial color="#3bb7e4" roughness={0.42} />
      </mesh>
    </group>
  );
}

function PipetteSet({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {[-0.14, 0, 0.14].map((x, index) => (
        <group key={x} position={[x, 0.08, 0]} rotation={[0.08, 0, -0.35]}>
          <mesh castShadow position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.36, 16]} />
            <meshStandardMaterial color="#eff5f6" roughness={0.18} metalness={0.24} />
          </mesh>
          <mesh castShadow position={[0, 0.33, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.12, 16]} />
            <meshStandardMaterial color={['#5cc8ff', '#f5d56f', '#8fe36d'][index]} roughness={0.16} metalness={0.2} />
          </mesh>
          <mesh castShadow position={[0, -0.11, 0]}>
            <coneGeometry args={[0.022, 0.2, 16]} />
            <meshPhysicalMaterial color="#eaffff" transparent opacity={0.52} roughness={0.02} transmission={0.22} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BunsenBurner({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.07, 32]} />
        <meshStandardMaterial color="#4d5a60" roughness={0.18} metalness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 0.38, 24]} />
        <meshStandardMaterial color="#bac9cf" roughness={0.16} metalness={0.78} />
      </mesh>
      <mesh castShadow position={[0.13, 0.17, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.28, 16]} />
        <meshStandardMaterial color="#5b6b72" roughness={0.18} metalness={0.68} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <coneGeometry args={[0.07, 0.22, 24]} />
        <meshStandardMaterial color="#65cfff" transparent opacity={0.45} emissive="#217da3" emissiveIntensity={0.45} roughness={0.15} />
      </mesh>
    </group>
  );
}

function ScienceProps({ position = [0, 0, 0], variant = 'front' }) {
  return (
    <group position={position}>
      {variant === 'front' && (
        <>
          <TestTubeRack position={[-0.9, 1.25, -0.16]} rotation={[0, 0.25, 0]} />
          <LabBottles position={[0.08, 1.22, -0.22]} rotation={[0, -0.18, 0]} />
          <TabletConsole position={[0.94, 1.22, 0.2]} rotation={[0, -0.35, 0]} />
          <PipetteSet position={[0.48, 1.2, 0.32]} rotation={[0, 0.2, 0]} />
        </>
      )}
      {variant === 'back' && (
        <>
          <SafetyGear position={[-0.9, 1.22, 0.18]} rotation={[0, 0.28, 0]} />
          <BunsenBurner position={[-0.28, 1.2, -0.22]} rotation={[0, -0.2, 0]} />
          <TestTubeRack position={[0.55, 1.25, 0.18]} rotation={[0, -0.25, 0]} />
          <LabBottles position={[1.06, 1.22, -0.24]} rotation={[0, 0.16, 0]} />
        </>
      )}
    </group>
  );
}

function LabPoster({ position, rotation, title, subtitle, accent = '#24c4f4' }) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[2.25, 1.18, 0.05]} radius={0.05} castShadow receiveShadow>
        <meshStandardMaterial color="#eef6f8" roughness={0.35} />
      </RoundedBox>
      <Text position={[0, 0.26, 0.035]} fontSize={0.16} color="#102129" anchorX="center" anchorY="middle">
        {title}
      </Text>
      <Text position={[0, 0.02, 0.035]} fontSize={0.065} color="#2d4752" anchorX="center" anchorY="middle" maxWidth={1.7}>
        {subtitle}
      </Text>
      <mesh position={[0, -0.38, 0.035]}>
        <boxGeometry args={[1.45, 0.08, 0.018]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function LabThemeDetails({ lab }) {
  const kind = lab?.kind ?? 'density';
  const accent = {
    volcano: '#ff7a2e',
    rainbow: '#8b62ff',
    rocket: '#ff5b78',
    chocolate: '#f2a65a',
    density: '#24c4f4',
  }[kind] ?? '#24c4f4';

  return (
    <group>
      <group position={[0, 2.4, -4.66]}>
        <RoundedBox castShadow receiveShadow args={[3.2, 1.18, 0.06]} radius={0.04}>
          <meshStandardMaterial color="#0b1820" emissive="#07131a" emissiveIntensity={0.35} roughness={0.22} />
        </RoundedBox>
        <Text position={[0, 0.24, 0.04]} fontSize={0.15} color={accent} anchorX="center" maxWidth={2.7}>
          {lab?.title ?? 'Density Lab'}
        </Text>
        <Text position={[0, -0.06, 0.04]} fontSize={0.062} color="#e9fbff" anchorX="center" maxWidth={2.55}>
          {lab?.objective ?? 'Measure, observe, calculate, explain.'}
        </Text>
        <mesh position={[0, -0.42, 0.045]}>
          <boxGeometry args={[2.36, 0.055, 0.014]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
        </mesh>
      </group>

      {kind === 'volcano' && (
        <group>
        <group position={[-4.25, 1.25, -4.02]}>
          <RoundedBox castShadow args={[1.3, 0.9, 0.5]} radius={0.045}>
            <meshStandardMaterial color="#2b353a" roughness={0.25} metalness={0.34} />
          </RoundedBox>
          <Text position={[0, 0.58, 0.28]} fontSize={0.07} color="#ffb17e" anchorX="center">reaction hood</Text>
          <pointLight position={[0, 0.75, 0.2]} intensity={0.45} color="#ff8a45" />
        </group>
        <group position={[4.4, 2.2, -4.05]}>
          {[0, 0.28, 0.56].map((x) => (
            <mesh key={x} castShadow position={[x, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.5, 24]} />
              <meshPhysicalMaterial color="#fff4e6" transparent opacity={0.45} roughness={0.03} transmission={0.25} />
            </mesh>
          ))}
          <Text position={[0.28, -0.48, 0.05]} fontSize={0.06} color="#ffb17e" anchorX="center">chemistry bay</Text>
        </group>
        </group>
      )}

      {kind === 'rainbow' && (
        <group>
        <group position={[4.2, 2.2, -4.04]}>
          {['#ff4a4a', '#ffb33d', '#fff05a', '#69df65', '#48b5ff', '#8b62ff'].map((color, index) => (
            <mesh key={color} position={[0, 0.36 - index * 0.12, 0]}>
              <boxGeometry args={[1.25, 0.045, 0.035]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.38} />
            </mesh>
          ))}
          <Text position={[0, -0.5, 0.05]} fontSize={0.06} color="#eaffff" anchorX="center">light studio</Text>
        </group>
        <pointLight position={[4.2, 2.4, -3.2]} intensity={0.9} color="#8b62ff" />
        <mesh position={[-4.3, 2.35, -4.05]}>
          <boxGeometry args={[1.3, 0.82, 0.04]} />
          <meshStandardMaterial color="#0b1820" emissive="#143060" emissiveIntensity={0.4} roughness={0.22} />
        </mesh>
        </group>
      )}

      {kind === 'rocket' && (
        <group>
        <group position={[0, 3.1, -3.95]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 5.4, 16]} />
            <meshStandardMaterial color="#cfdde3" roughness={0.2} metalness={0.55} />
          </mesh>
          <Text position={[0, -0.32, 0.05]} fontSize={0.065} color="#ffb2c0" anchorX="center">motion track</Text>
        </group>
        {[-4.2, 4.2].map((x) => (
          <group key={x} position={[x, 1.55, -4.05]}>
            <mesh castShadow>
              <boxGeometry args={[0.7, 1.2, 0.18]} />
              <meshStandardMaterial color="#24323a" roughness={0.24} metalness={0.32} />
            </mesh>
            <Text position={[0, 0.72, 0.11]} fontSize={0.06} color="#ffb2c0" anchorX="center">force sensor</Text>
          </group>
        ))}
        </group>
      )}

      {kind === 'chocolate' && (
        <group>
        <group position={[-4.4, 1.35, -3.9]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.16, 0.52]} />
            <meshStandardMaterial color="#3b4650" roughness={0.22} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.86, 0.035, 0.38]} />
            <meshStandardMaterial color="#ff725c" emissive="#8a2318" emissiveIntensity={0.32} />
          </mesh>
          <Text position={[0, 0.35, 0.05]} fontSize={0.06} color="#ffd2a6" anchorX="center">heat bench</Text>
        </group>
        <group position={[4.25, 1.55, -4.04]}>
          {[0, 0.22, 0.44, 0.66].map((x) => (
            <mesh key={x} castShadow position={[x, 0, 0]}>
              <boxGeometry args={[0.16, 0.12, 0.22]} />
              <meshStandardMaterial color="#5a301e" roughness={0.35} />
            </mesh>
          ))}
          <Text position={[0.33, 0.38, 0.05]} fontSize={0.06} color="#ffd2a6" anchorX="center">sample shelf</Text>
        </group>
        </group>
      )}
    </group>
  );
}

export default function LabRoom({ lab }) {
  const floor = useTexture('/textures/floor-grid.svg');
  floor.wrapS = THREE.RepeatWrapping;
  floor.wrapT = THREE.RepeatWrapping;
  floor.repeat.set(6, 5);
  const kind = lab?.kind ?? 'density';
  const room = {
    volcano: { wall: '#ebe2d7', side: '#ddd0c2', floor: '#d5c8bc' },
    rainbow: { wall: '#dce1f0', side: '#d6dceb', floor: '#cfd6e7' },
    rocket: { wall: '#e6eef5', side: '#d8e3ec', floor: '#cbd8e2' },
    chocolate: { wall: '#efe2d2', side: '#e5d4bf', floor: '#d7c4ad' },
    density: { wall: '#dce9ed', side: '#d5e2e6', floor: '#d6dde0' },
  }[kind] ?? { wall: '#dce9ed', side: '#d5e2e6', floor: '#d6dde0' };

  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial map={floor} color={room.floor} roughness={0.26} metalness={0.05} />
      </mesh>
      <mesh receiveShadow position={[0, 2.05, -4.8]}>
        <boxGeometry args={[12, 4.2, 0.18]} />
        <meshStandardMaterial color={room.wall} roughness={0.48} />
      </mesh>
      <mesh receiveShadow position={[-5.9, 2.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4.2, 0.18]} />
        <meshStandardMaterial color={room.side} roughness={0.5} />
      </mesh>
      <mesh receiveShadow position={[5.9, 2.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 4.2, 0.18]} />
        <meshStandardMaterial color={room.side} roughness={0.5} />
      </mesh>
      <mesh receiveShadow position={[0, 4.12, 0]}>
        <boxGeometry args={[12, 0.16, 10]} />
        <meshStandardMaterial color="#f2f6f7" roughness={0.4} />
      </mesh>

      <Bench position={[-2.35, 0, -1.2]} />
      <Bench position={[2.2, 0, -1.35]} />
      <Bench position={[-2.35, 0, 2.05]} scale={[0.92, 1, 0.9]} />
      <Bench position={[2.3, 0, 2.1]} scale={[0.92, 1, 0.9]} />
      <BackCounters />

      <Microscope position={[1.75, 1.22, -1.28]} />
      <Glassware position={[-2.95, 1.23, -1.36]} />
      <TestTubeRack position={[2.9, 1.25, 1.92]} rotation={[0, -0.25, 0]} />
      <LabBottles position={[-2.85, 1.22, 2.0]} rotation={[0, 0.18, 0]} />

      <LabPoster
        position={[-5.79, 2.55, 2.45]}
        rotation={[0, Math.PI / 2, 0]}
        title="Daily Life Science"
        subtitle={`${lab?.topic ?? 'Water'}: observe, test, explain.`}
      />
      <LabPoster
        position={[5.79, 2.55, 2.45]}
        rotation={[0, -Math.PI / 2, 0]}
        title="DLS Virtual Lab"
        subtitle={lab?.title ?? 'Real classroom experiments in a guided 3D environment.'}
        accent="#83e47d"
      />
      <LabThemeDetails lab={lab} />

      <group position={[0, 3.95, -1.6]}>
        {[-3.8, -1.25, 1.25, 3.8].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[1.7, 0.055, 0.52]} />
            <meshStandardMaterial color="#ffffff" emissive="#dff9ff" emissiveIntensity={0.95} roughness={0.18} />
          </mesh>
        ))}
      </group>

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        <Html transform position={[-4.72, 2.6, -2.7]} rotation={[0, Math.PI / 2, 0]} distanceFactor={7}>
          <div className="wall-chip">DLS Lab Room A</div>
        </Html>
      </Float>
    </group>
  );
}
