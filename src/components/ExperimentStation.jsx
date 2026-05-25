import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

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

function ActionButton({ position, children, onClick, disabled = false }) {
  return (
    <Html transform position={position} distanceFactor={5}>
      <button className="station-label station-action" type="button" onClick={(event) => { event.stopPropagation(); if (!disabled) onClick(); }} disabled={disabled}>
        {children}
      </button>
    </Html>
  );
}

function AnimatedFoam({ active }) {
  const groupRef = useRef();
  const bubbles = useMemo(() => Array.from({ length: 28 }, (_, index) => ({
    angle: index * 1.61,
    radius: 0.07 + (index % 6) * 0.038,
    speed: 0.8 + (index % 5) * 0.18,
    size: 0.035 + (index % 4) * 0.014,
    delay: (index % 9) * 0.12,
  })), []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !active) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, index) => {
      const bubble = bubbles[index];
      const life = (t * bubble.speed + bubble.delay) % 1;
      const spread = bubble.radius + life * 0.42;
      child.position.set(Math.cos(bubble.angle + life * 2.2) * spread, 1.86 + life * 0.72, Math.sin(bubble.angle) * spread * 0.64);
      const scale = (1 - life * 0.42) * (1 + Math.sin(t * 8 + index) * 0.08);
      child.scale.setScalar(Math.max(0.2, scale));
      child.material.opacity = 0.88 * (1 - life * 0.55);
    });
  });

  if (!active) return null;

  return (
    <group ref={groupRef}>
      {bubbles.map((bubble, index) => (
        <mesh key={index}>
          <sphereGeometry args={[bubble.size, 16, 10]} />
          <meshStandardMaterial color={index % 3 === 0 ? '#fff7df' : '#ffffff'} transparent opacity={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function VolcanoStation({ step, advance }) {
  const foaming = step >= 2;
  const pourRef = useRef();
  const overflowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (pourRef.current) {
      pourRef.current.visible = step === 1;
      pourRef.current.scale.y = 0.75 + Math.sin(t * 9) * 0.12;
    }
    if (overflowRef.current) {
      overflowRef.current.children.forEach((child, index) => {
        child.position.y = 1.55 - ((t * (0.22 + index * 0.03)) % 0.32);
        child.scale.y = 1 + Math.sin(t * 6 + index) * 0.18;
      });
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.42, 0]}>
        <coneGeometry args={[0.68, 0.92, 56]} />
        <meshStandardMaterial color="#835339" roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.18, 0.12, 0.09, 36]} />
        <meshStandardMaterial color="#302017" roughness={0.68} />
      </mesh>
      <mesh ref={pourRef} position={[-0.38, 1.82, 0.06]} rotation={[0.35, 0, -0.62]}>
        <cylinderGeometry args={[0.026, 0.018, 0.7, 14]} />
        <meshStandardMaterial color="#dffcff" transparent opacity={0.72} roughness={0.04} />
      </mesh>
      <mesh position={[0, 1.91, 0]}>
        <sphereGeometry args={[foaming ? 0.23 : 0.14, 32, 18]} />
        <meshStandardMaterial color="#fff4e6" transparent opacity={foaming ? 0.9 : 0.35} roughness={0.22} />
      </mesh>
      <group ref={overflowRef} visible={foaming}>
        {[[-0.22, 1.55, 0.16], [0.22, 1.55, 0.08], [0.03, 1.56, -0.22], [-0.06, 1.52, 0.28]].map((position, index) => (
          <mesh key={index} position={position} rotation={[0.08, index * 0.7, 0.1]}>
            <capsuleGeometry args={[0.055, 0.34, 8, 16]} />
            <meshStandardMaterial color="#fff1d8" transparent opacity={0.82} roughness={0.25} />
          </mesh>
        ))}
      </group>
      <AnimatedFoam active={foaming} />
      <mesh castShadow position={[-0.95, 1.33, 0.22]} rotation={[step === 1 ? 0.5 : 0, 0, step === 1 ? -0.72 : 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.4, 24]} />
        <meshPhysicalMaterial color="#eaffff" transparent opacity={0.45} roughness={0.02} transmission={0.3} />
      </mesh>
      <mesh castShadow position={[0.95, 1.32, 0.22]}>
        <boxGeometry args={[0.28, 0.16, 0.22]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.45} />
      </mesh>
      <Text position={[-0.95, 1.62, 0.22]} fontSize={0.06} color="#eaffff" anchorX="center">vinegar</Text>
      <Text position={[0.95, 1.5, 0.22]} fontSize={0.052} color="#eaffff" anchorX="center">baking soda</Text>
      {step === 0 && <ActionButton position={[0.95, 1.74, 0.22]} onClick={advance}>Add baking soda</ActionButton>}
      {step === 1 && <ActionButton position={[-0.95, 1.84, 0.22]} onClick={advance}>Pour vinegar</ActionButton>}
      {step === 2 && <ActionButton position={[0, 2.58, 0]} onClick={advance}>Observe foam</ActionButton>}
      {step >= 3 && <ActionButton position={[0, 2.58, 0]} onClick={advance} disabled>Foam reaction complete</ActionButton>}
    </group>
  );
}

function RocketStation({ step, advance }) {
  const rocketRef = useRef();
  const exhaustRef = useRef();
  const released = step >= 3;
  const inflated = step >= 1 && step < 3;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (rocketRef.current) {
      const travel = released ? -0.62 + ((t * 0.9) % 1.75) : step >= 2 ? 0.02 : -0.68;
      rocketRef.current.position.x = travel;
      rocketRef.current.position.y = 1.8 + (released ? Math.sin(t * 18) * 0.018 : 0);
    }
    if (exhaustRef.current) {
      exhaustRef.current.children.forEach((child, index) => {
        child.position.x = -0.35 - ((t * (0.5 + index * 0.08)) % 0.55);
        child.scale.x = 0.65 + Math.sin(t * 10 + index) * 0.22;
        child.material.opacity = 0.7 - index * 0.08;
      });
    }
  });

  return (
    <group>
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 2.65, 12]} />
        <meshStandardMaterial color="#d9e6ea" roughness={0.24} metalness={0.35} />
      </mesh>
      <group ref={rocketRef} position={[-0.68, 1.8, 0]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[inflated ? 0.25 : 0.14, inflated ? 0.6 : 0.28, 14, 28]} />
          <meshStandardMaterial color="#ff4f74" roughness={0.34} />
        </mesh>
        <mesh position={[0.36, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.06, 0.14, 18]} />
          <meshStandardMaterial color="#d62455" roughness={0.28} />
        </mesh>
        <group ref={exhaustRef} visible={released} position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          {[0, 1, 2, 3, 4].map((index) => (
            <mesh key={index} position={[-index * 0.09, 0, (index - 2) * 0.025]}>
              <coneGeometry args={[0.045 + index * 0.008, 0.28, 16]} />
              <meshStandardMaterial color={index % 2 ? '#fff4b8' : '#ff9d2e'} emissive="#ff7a1a" emissiveIntensity={0.5} transparent opacity={0.66} />
            </mesh>
          ))}
        </group>
      </group>
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} castShadow position={[x, 1.42, 0]}>
          <boxGeometry args={[0.12, 0.86, 0.12]} />
          <meshStandardMaterial color="#8798a0" roughness={0.24} metalness={0.55} />
        </mesh>
      ))}
      <Text position={[0, 2.16, 0]} fontSize={0.075} color="#eaffff" anchorX="center">escaping air thrusts backward</Text>
      {step === 0 && <ActionButton position={[-0.64, 2.08, 0]} onClick={advance}>Inflate balloon</ActionButton>}
      {step === 1 && <ActionButton position={[-0.1, 2.08, 0]} onClick={advance}>Attach to string</ActionButton>}
      {step === 2 && <ActionButton position={[0.18, 2.08, 0]} onClick={advance}>Release air</ActionButton>}
      {step >= 3 && <ActionButton position={[0.78, 2.08, 0]} onClick={advance}>Explain thrust</ActionButton>}
    </group>
  );
}

function ChocolateStation({ step, advance }) {
  const heatOn = step >= 2;
  const heatRef = useRef();
  useFrame(({ clock }) => {
    if (!heatRef.current) return;
    const t = clock.elapsedTime;
    heatRef.current.children.forEach((child, index) => {
      child.scale.y = 0.72 + Math.sin(t * 5 + index) * 0.22;
      child.material.opacity = heatOn ? 0.42 + Math.sin(t * 4 + index) * 0.08 : 0.08;
    });
  });

  return (
    <group>
      <group ref={heatRef}>
        {[-0.78, 0, 0.78].map((x, index) => (
          <mesh key={x} position={[x, 1.25, 0]} rotation={[0, 0, 0.1]}>
            <coneGeometry args={[0.18, 0.5, 24]} />
            <meshStandardMaterial color="#ff7b45" emissive="#ff3616" emissiveIntensity={0.45} transparent opacity={heatOn ? 0.35 : 0.06} roughness={0.5} />
          </mesh>
        ))}
      </group>
      {[
        ['metal', '#c4d0d6', 0.9],
        ['wood', '#9b633b', 0.42],
        ['plastic', '#3db8e4', 0.3],
      ].map(([label, color, melt], index) => {
        const melted = heatOn ? melt : 0;
        return (
          <group key={label} position={[-0.78 + index * 0.78, 1.36, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.58, 0.055, 0.28]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={label === 'metal' ? 0.72 : 0.04} />
            </mesh>
            <mesh castShadow position={[0, 0.08 - melted * 0.015, 0]}>
              <boxGeometry args={[0.24 + melted * 0.16, 0.07 * (1 - melted * 0.52), 0.2 + melted * 0.12]} />
              <meshStandardMaterial color="#5a301e" roughness={0.32} />
            </mesh>
            {melted > 0 && <mesh position={[0.02, 0.043, 0.02]}>
              <cylinderGeometry args={[0.16 * melted, 0.2 * melted, 0.018, 30]} />
              <meshStandardMaterial color="#3f1f13" roughness={0.22} />
            </mesh>}
            <mesh position={[0, -0.12, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.38, 16]} />
              <meshStandardMaterial color={heatOn ? '#ff725c' : '#677983'} emissive="#8a2318" emissiveIntensity={heatOn ? 0.35 : 0.02} />
            </mesh>
            <Text position={[0, 0.24, 0]} fontSize={0.06} color="#eaffff" anchorX="center">{label}</Text>
          </group>
        );
      })}
      {step === 0 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Place chocolate</ActionButton>}
      {step === 1 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Turn on heat</ActionButton>}
      {step === 2 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Compare melting</ActionButton>}
      {step >= 3 && <ActionButton position={[0, 1.88, 0]} onClick={advance}>Metal melts fastest</ActionButton>}
    </group>
  );
}

function RainbowStation({ step, advance }) {
  const beamRef = useRef();
  const beamOn = step >= 1;
  const spectrumOn = step >= 2;
  useFrame(({ clock }) => {
    if (!beamRef.current) return;
    const t = clock.elapsedTime;
    beamRef.current.children.forEach((child, index) => {
      child.material.opacity = 0.58 + Math.sin(t * 5 + index) * 0.18;
      child.rotation.z = Math.PI / 2 - index * 0.052 + Math.sin(t * 2 + index) * 0.018;
    });
  });

  return (
    <group>
      <mesh position={[-1.1, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.055, 0.58, 24]} />
        <meshStandardMaterial color="#f8fbff" emissive="#ffffff" emissiveIntensity={1.1} />
      </mesh>
      {beamOn && <mesh position={[-0.5, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.024, 0.024, 1.08, 18]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} transparent opacity={0.72} />
      </mesh>}
      <mesh castShadow position={[0.18, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.31, 0.38, 3]} />
        <meshPhysicalMaterial color="#dffcff" transparent opacity={0.46} roughness={0.01} transmission={0.5} />
      </mesh>
      <group ref={beamRef} visible={spectrumOn}>
        {['#ff4242', '#ff9e2b', '#fff35b', '#66df65', '#42b7ff', '#8360ff'].map((color, index) => (
          <mesh key={color} position={[0.72, 1.42 + index * 0.052, 0]} rotation={[0, 0, Math.PI / 2 - index * 0.052]}>
            <cylinderGeometry args={[0.014, 0.014, 1.0, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
      {spectrumOn && <mesh position={[1.28, 1.55, -0.05]}>
        <boxGeometry args={[0.04, 0.72, 0.48]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.18} />
      </mesh>}
      {step === 0 && <ActionButton position={[-1.1, 1.92, 0]} onClick={advance}>Turn on light</ActionButton>}
      {step === 1 && <ActionButton position={[0.18, 1.92, 0]} onClick={advance}>Add prism/water</ActionButton>}
      {step === 2 && <ActionButton position={[0.82, 1.92, 0]} onClick={advance}>Observe colors</ActionButton>}
      {step >= 3 && <ActionButton position={[0.82, 1.92, 0]} onClick={advance}>Refraction complete</ActionButton>}
    </group>
  );
}

function HeatStation() {
  return <ChocolateStation step={2} advance={() => {}} />;
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
        <RoundedBox args={[2.35, 0.58, 0.05]} radius={0.04}>
          <meshStandardMaterial color="#07151c" emissive="#082632" emissiveIntensity={0.45} roughness={0.22} />
        </RoundedBox>
        <Text position={[0, 0.13, 0.035]} fontSize={0.075} color="#73e2ff" anchorX="center" maxWidth={2.05}>
          {lab?.title}
        </Text>
        <Text position={[0, -0.1, 0.035]} fontSize={0.048} color="#e9fbff" anchorX="center" maxWidth={2.0}>
          Click each action button to run the experiment
        </Text>
      </group>
    </group>
  );
}
