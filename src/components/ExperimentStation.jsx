import { Html, RoundedBox, Text } from '@react-three/drei';

function WorkTable() {
  return (
    <group>
      <RoundedBox castShadow receiveShadow args={[3.78, 0.27, 1.52]} radius={0.06} position={[0, 1.04, 0]}>
        <meshStandardMaterial color="#eef4f6" roughness={0.25} metalness={0.05} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[3.56, 0.08, 1.3]} radius={0.04} position={[0, 1.23, 0]}>
        <meshStandardMaterial color="#162229" roughness={0.13} metalness={0.38} />
      </RoundedBox>
    </group>
  );
}

function HeatStation() {
  return (
    <group>
      <mesh castShadow position={[-0.55, 1.47, 0]}>
        <cylinderGeometry args={[0.38, 0.32, 0.58, 40, 1, true]} />
        <meshPhysicalMaterial color="#e8fbff" transparent opacity={0.44} roughness={0.02} transmission={0.28} />
      </mesh>
      <mesh position={[-0.55, 1.28, 0]}>
        <cylinderGeometry args={[0.34, 0.3, 0.24, 36]} />
        <meshStandardMaterial color="#ffb65c" transparent opacity={0.52} roughness={0.08} />
      </mesh>
      {[
        ['Metal', '#c7d4db', 0.88],
        ['Wood', '#a86f3e', 0.52],
        ['Plastic', '#4ebfe6', 0.34],
      ].map(([label, color, height], index) => (
        <group key={label} position={[0.25 + index * 0.42, 1.32, -0.18]} rotation={[0.22, 0, -0.68]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.035, 0.035, 1.18, 18]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={label === 'Metal' ? 0.7 : 0.05} />
          </mesh>
          <mesh position={[0.18, 0.34, 0]} rotation={[0, 0, 0.68]}>
            <boxGeometry args={[0.08, height, 0.04]} />
            <meshStandardMaterial color="#ff5e3d" emissive="#812412" emissiveIntensity={0.25} />
          </mesh>
          <Text position={[0.22, 0.9, 0]} rotation={[0, 0, 0.68]} fontSize={0.055} color="#eaffff" anchorX="center">
            {label}
          </Text>
        </group>
      ))}
    </group>
  );
}

function ActionButton({ position, children, onClick, disabled = false }) {
  return (
    <Html transform position={position} distanceFactor={5}>
      <button className="station-label station-action" type="button" onClick={(event) => { event.stopPropagation(); if (!disabled) onClick(); }} disabled={disabled}>
        {children}
      </button>
    </Html>
  );
}

function VolcanoStation({ step, advance }) {
  const foaming = step >= 2;
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.42, 0]}>
        <coneGeometry args={[0.64, 0.86, 44]} />
        <meshStandardMaterial color="#8b5940" roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.16, 0.11, 0.08, 28]} />
        <meshStandardMaterial color="#402b22" roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.9 + (foaming ? 0.1 : 0), 0]}>
        <sphereGeometry args={[0.18, 28, 16]} />
        <meshStandardMaterial color="#fff4e6" transparent opacity={foaming ? 0.86 : 0.38} roughness={0.18} />
      </mesh>
      {(foaming ? [[-0.12, 1.77, 0.08], [0.18, 1.68, -0.04], [0.02, 1.55, 0.16], [-0.22, 1.95, 0.03], [0.22, 2.02, 0.1]] : []).map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.08 - index * 0.012, 18, 12]} />
          <meshStandardMaterial color="#ff7a2e" emissive="#8a250c" emissiveIntensity={0.18} roughness={0.3} />
        </mesh>
      ))}
      <mesh castShadow position={[-0.95, 1.33, 0.22]}>
        <cylinderGeometry args={[0.12, 0.1, 0.4, 24]} />
        <meshPhysicalMaterial color="#eaffff" transparent opacity={0.45} roughness={0.02} transmission={0.3} />
      </mesh>
      <Text position={[-0.95, 1.62, 0.22]} fontSize={0.06} color="#eaffff" anchorX="center">vinegar</Text>
      <mesh castShadow position={[0.95, 1.32, 0.22]}>
        <boxGeometry args={[0.28, 0.16, 0.22]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.45} />
      </mesh>
      <Text position={[0.95, 1.5, 0.22]} fontSize={0.052} color="#eaffff" anchorX="center">baking soda</Text>
      {step === 0 && <ActionButton position={[0.95, 1.74, 0.22]} onClick={advance}>Add baking soda</ActionButton>}
      {step === 1 && <ActionButton position={[-0.95, 1.84, 0.22]} onClick={advance}>Pour vinegar</ActionButton>}
      {step === 2 && <ActionButton position={[0, 2.25, 0]} onClick={advance}>Observe foam</ActionButton>}
      {step >= 3 && <ActionButton position={[0, 2.25, 0]} onClick={advance} disabled>Reaction complete</ActionButton>}
    </group>
  );
}

function RocketStation({ step, advance }) {
  const x = step >= 3 ? 0.78 : step >= 2 ? 0.18 : -0.55;
  const inflated = step >= 1 && step < 3;
  return (
    <group>
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 2.5, 12]} />
        <meshStandardMaterial color="#d9e6ea" roughness={0.24} metalness={0.35} />
      </mesh>
      <mesh castShadow position={[x, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[inflated ? 0.22 : 0.13, inflated ? 0.52 : 0.28, 12, 24]} />
        <meshStandardMaterial color="#ff5b78" roughness={0.34} />
      </mesh>
      {step >= 3 && <mesh position={[x - 0.42, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.11, 0.28, 22]} />
        <meshStandardMaterial color="#ffb13d" emissive="#793612" emissiveIntensity={0.28} transparent opacity={0.78} />
      </mesh>}
      {[-1.05, 1.05].map((x) => (
        <mesh key={x} castShadow position={[x, 1.42, 0]}>
          <boxGeometry args={[0.12, 0.86, 0.12]} />
          <meshStandardMaterial color="#8798a0" roughness={0.24} metalness={0.55} />
        </mesh>
      ))}
      <Text position={[0, 2.12, 0]} fontSize={0.075} color="#eaffff" anchorX="center">air pushes backward, balloon moves forward</Text>
      {step === 0 && <ActionButton position={[-0.55, 2.08, 0]} onClick={advance}>Inflate balloon</ActionButton>}
      {step === 1 && <ActionButton position={[-0.1, 2.08, 0]} onClick={advance}>Attach to string</ActionButton>}
      {step === 2 && <ActionButton position={[0.18, 2.08, 0]} onClick={advance}>Release air</ActionButton>}
      {step >= 3 && <ActionButton position={[0.78, 2.08, 0]} onClick={advance}>Explain thrust</ActionButton>}
    </group>
  );
}

function ChocolateStation({ step, advance }) {
  const heatOn = step >= 2;
  return (
    <group>
      {[
        ['metal', '#c4d0d6', 0.72],
        ['wood', '#9b633b', 0.38],
        ['plastic', '#3db8e4', 0.24],
      ].map(([label, color, melt], index) => (
        <group key={label} position={[-0.78 + index * 0.78, 1.36, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.58, 0.055, 0.28]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={label === 'metal' ? 0.72 : 0.04} />
          </mesh>
          <mesh castShadow position={[0, 0.08, 0]}>
            <boxGeometry args={[0.24 + (heatOn ? melt : 0) * 0.12, 0.07 * (1 - (heatOn ? melt : 0) * 0.45), 0.2 + (heatOn ? melt : 0) * 0.1]} />
            <meshStandardMaterial color="#5a301e" roughness={0.32} />
          </mesh>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.38, 16]} />
            <meshStandardMaterial color={heatOn ? '#ff725c' : '#677983'} emissive="#8a2318" emissiveIntensity={heatOn ? 0.35 : 0.02} />
          </mesh>
          <Text position={[0, 0.24, 0]} fontSize={0.06} color="#eaffff" anchorX="center">{label}</Text>
        </group>
      ))}
      {step === 0 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Place chocolate</ActionButton>}
      {step === 1 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Turn on heat</ActionButton>}
      {step === 2 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Compare melting</ActionButton>}
      {step >= 3 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Metal wins</ActionButton>}
    </group>
  );
}

function RainbowStation({ step, advance }) {
  const beamOn = step >= 1;
  const spectrumOn = step >= 2;
  return (
    <group>
      <mesh position={[-1.1, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 20]} />
        <meshStandardMaterial color="#f8fbff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      {beamOn && <mesh position={[-0.48, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 1.0, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </mesh>}
      <mesh castShadow position={[0.18, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.28, 0.34, 3]} />
        <meshPhysicalMaterial color="#dffcff" transparent opacity={0.42} roughness={0.02} transmission={0.45} />
      </mesh>
      {spectrumOn && ['#ff4a4a', '#ffb33d', '#fff05a', '#69df65', '#48b5ff', '#8b62ff'].map((color, index) => (
        <mesh key={color} position={[0.72, 1.42 + index * 0.05, 0]} rotation={[0, 0, Math.PI / 2 - index * 0.045]}>
          <cylinderGeometry args={[0.01, 0.01, 0.92, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {step === 0 && <ActionButton position={[-1.1, 1.92, 0]} onClick={advance}>Turn on light</ActionButton>}
      {step === 1 && <ActionButton position={[0.18, 1.92, 0]} onClick={advance}>Add prism/water</ActionButton>}
      {step === 2 && <ActionButton position={[0.82, 1.92, 0]} onClick={advance}>Observe colors</ActionButton>}
      {step >= 3 && <ActionButton position={[0.82, 1.92, 0]} onClick={advance}>Refraction complete</ActionButton>}
    </group>
  );
}

export default function ExperimentStation({ lab, state, actions }) {
  const kind = lab?.kind ?? 'heat';
  const step = state?.moduleStep ?? 0;
  const advance = actions?.advanceModuleStep ?? (() => {});
  return (
    <group position={[0, 0, 0.24]}>
      <WorkTable />
      {kind === 'volcano' && <VolcanoStation step={step} advance={advance} />}
      {kind === 'heat' && <HeatStation />}
      {kind === 'chocolate' && <ChocolateStation step={step} advance={advance} />}
      {kind === 'rocket' && <RocketStation step={step} advance={advance} />}
      {kind === 'rainbow' && <RainbowStation step={step} advance={advance} />}
      <group position={[0, 1.74, -0.68]}>
        <RoundedBox args={[2.2, 0.56, 0.05]} radius={0.04}>
          <meshStandardMaterial color="#07151c" emissive="#082632" emissiveIntensity={0.45} roughness={0.22} />
        </RoundedBox>
        <Text position={[0, 0.12, 0.035]} fontSize={0.075} color="#73e2ff" anchorX="center" maxWidth={1.9}>
          {lab?.title}
        </Text>
        <Text position={[0, -0.1, 0.035]} fontSize={0.048} color="#e9fbff" anchorX="center" maxWidth={1.9}>
          Guided 3D lab module
        </Text>
      </group>
    </group>
  );
}
