import { useMemo, useState } from 'react';
import { Html, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const stationOffset = new THREE.Vector3(0, 0, 0.24);
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.55);
const scaleTarget = new THREE.Vector3(0.78, 1.54, 0.25);
const tankTarget = new THREE.Vector3(1.48, 1.38, -0.28);
const trayPositions = {
  aluminum: new THREE.Vector3(-1.26, 1.38, 0.3),
  acrylic: new THREE.Vector3(-0.74, 1.38, 0.3),
  brass: new THREE.Vector3(-0.22, 1.38, 0.3),
};

function displayPositionFor(id, selectedObject, samplePlacement, dragPosition) {
  if (dragPosition && id === selectedObject) return dragPosition;
  if (id !== selectedObject) return trayPositions[id];
  if (samplePlacement === 'tank') return tankTarget;
  if (samplePlacement === 'scale') return scaleTarget;
  return trayPositions[id].clone().setY(1.58);
}

function ObjectGeometry({ id }) {
  if (id === 'aluminum') return <cylinderGeometry args={[0.18, 0.18, 0.44, 48]} />;
  if (id === 'acrylic') return <boxGeometry args={[0.42, 0.28, 0.32]} />;
  return <boxGeometry args={[0.31, 0.31, 0.31]} />;
}

function SampleObject({ id, object, active, position, dragging, onPointerDown }) {
  const materialProps = {
    color: object.color,
    roughness: id === 'acrylic' ? 0.04 : 0.18,
    metalness: id === 'acrylic' ? 0.02 : 0.74,
    transparent: id === 'acrylic',
    opacity: id === 'acrylic' ? 0.72 : 1,
  };

  return (
    <group
      position={position}
      onPointerDown={(event) => onPointerDown(event, id)}
      onClick={(event) => event.stopPropagation()}
    >
      <mesh castShadow>
        <ObjectGeometry id={id} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      {id === 'aluminum' && (
        <>
          <mesh castShadow position={[0, 0.23, 0]}>
            <cylinderGeometry args={[0.185, 0.185, 0.018, 48]} />
            <meshStandardMaterial color="#e8edf2" roughness={0.16} metalness={0.78} />
          </mesh>
          <mesh castShadow position={[0, -0.23, 0]}>
            <cylinderGeometry args={[0.185, 0.185, 0.018, 48]} />
            <meshStandardMaterial color="#8c9cab" roughness={0.22} metalness={0.7} />
          </mesh>
        </>
      )}
      {id === 'acrylic' && (
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.32, 0.19, 0.22]} />
          <meshStandardMaterial color="#c9f5ff" transparent opacity={0.22} roughness={0.02} />
        </mesh>
      )}
      {id === 'brass' && (
        <mesh castShadow position={[0, 0.165, 0]}>
          <boxGeometry args={[0.32, 0.02, 0.32]} />
          <meshStandardMaterial color="#f3c86b" roughness={0.13} metalness={0.78} />
        </mesh>
      )}
      {active && (
        <Text position={[0, dragging ? 0.52 : 0.42, 0]} fontSize={0.08} color="#eaffff" anchorX="center">
          {dragging ? 'dragging' : 'selected'}
        </Text>
      )}
    </group>
  );
}

function DigitalScale({ weighed, sample, onClick }) {
  return (
    <group position={[0.78, 1.29, 0.25]} onClick={onClick}>
      <RoundedBox castShadow receiveShadow args={[0.94, 0.18, 0.68]} radius={0.055}>
        <meshStandardMaterial color="#e6eef1" roughness={0.16} metalness={0.44} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[0.62, 0.05, 0.44]} radius={0.025} position={[0, 0.12, -0.07]}>
        <meshStandardMaterial color="#b9c7ce" roughness={0.11} metalness={0.74} />
      </RoundedBox>
      <mesh castShadow position={[0, 0.155, -0.07]}>
        <cylinderGeometry args={[0.21, 0.22, 0.018, 56]} />
        <meshStandardMaterial color="#f4f8fa" roughness={0.1} metalness={0.72} />
      </mesh>
      <RoundedBox args={[0.52, 0.14, 0.045]} radius={0.015} position={[0, 0.062, 0.36]}>
        <meshStandardMaterial color="#031017" emissive="#07394a" emissiveIntensity={0.82} roughness={0.18} />
      </RoundedBox>
      <Text position={[0, 0.082, 0.387]} fontSize={0.036} color="#7df0ff" anchorX="center" anchorY="middle">
        DLS DIGITAL SCALE
      </Text>
      <Text position={[0, 0.018, 0.388]} fontSize={0.062} color="#eaffff" anchorX="center" anchorY="middle">
        {weighed ? `${sample.mass} g` : '0.0 g'}
      </Text>
      {[-0.34, 0.34].map((x) =>
        [-0.22, 0.22].map((z) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, -0.115, z]}>
            <cylinderGeometry args={[0.045, 0.05, 0.035, 18]} />
            <meshStandardMaterial color="#4f5c61" roughness={0.28} metalness={0.35} />
          </mesh>
        )),
      )}
      <Html transform position={[0, 0.25, 0.39]} rotation={[-Math.PI / 2.7, 0, 0]} distanceFactor={4.6}>
        <button className="station-label" type="button">
          Drop sample here
        </button>
      </Html>
    </group>
  );
}

function WaterTank({ submerged, sample, onClick }) {
  const waterHeight = submerged ? 0.48 : 0.38;
  const waterY = -0.28 + waterHeight / 2;

  return (
    <group position={[1.48, 1.28, -0.28]} onClick={onClick}>
      <mesh castShadow receiveShadow position={[0, -0.33, 0]}>
        <boxGeometry args={[1.08, 0.06, 0.78]} />
        <meshStandardMaterial color="#d8e5e9" roughness={0.18} metalness={0.32} />
      </mesh>

      {[
        [0, 0, 0.39, 1.08, 0.74, 0.028],
        [0, 0, -0.39, 1.08, 0.74, 0.028],
        [-0.54, 0, 0, 0.028, 0.74, 0.78],
        [0.54, 0, 0, 0.028, 0.74, 0.78],
      ].map(([x, y, z, width, height, depth]) => (
        <mesh key={`${x}-${z}`} castShadow receiveShadow position={[x, y, z]}>
          <boxGeometry args={[width, height, depth]} />
          <meshPhysicalMaterial
            color="#e5fcff"
            transparent
            opacity={0.29}
            roughness={0.01}
            transmission={0.56}
            thickness={0.08}
            metalness={0}
          />
        </mesh>
      ))}

      {[
        [0, 0.39, 0.39, 1.14, 0.045, 0.045],
        [0, 0.39, -0.39, 1.14, 0.045, 0.045],
        [-0.54, 0.39, 0, 0.045, 0.045, 0.82],
        [0.54, 0.39, 0, 0.045, 0.045, 0.82],
      ].map(([x, y, z, width, height, depth]) => (
        <mesh key={`rim-${x}-${z}`} castShadow position={[x, y, z]}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color="#eef9fb" roughness={0.12} metalness={0.28} />
        </mesh>
      ))}

      <mesh position={[0, waterY, 0]}>
        <boxGeometry args={[0.98, waterHeight, 0.68]} />
        <meshPhysicalMaterial color="#35c6f4" transparent opacity={0.38} roughness={0.02} transmission={0.18} thickness={0.16} />
      </mesh>
      <mesh position={[0, waterY + waterHeight / 2 + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.94, 0.64, 12, 8]} />
        <meshStandardMaterial color="#a8f2ff" transparent opacity={0.48} roughness={0.05} metalness={0.02} />
      </mesh>
      {[-0.28, -0.08, 0.16, 0.33].map((x, index) => (
        <mesh key={`bubble-${x}`} position={[x, -0.18 + index * 0.1, -0.12 + index * 0.06]}>
          <sphereGeometry args={[0.018 + index * 0.003, 12, 8]} />
          <meshStandardMaterial color="#e8fbff" transparent opacity={0.44} roughness={0.02} />
        </mesh>
      ))}
      <mesh position={[0, 0.03, 0.407]}>
        <boxGeometry args={[0.96, 0.56, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>

      <mesh castShadow position={[0.68, 0.24, 0.25]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.34, 24]} />
        <meshStandardMaterial color="#d5e4e8" roughness={0.18} metalness={0.56} />
      </mesh>
      <mesh castShadow position={[0.84, 0.16, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 0.16, 24]} />
        <meshStandardMaterial color="#d5e4e8" roughness={0.18} metalness={0.56} />
      </mesh>
      {submerged && (
        <mesh position={[0.98, 0.03, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.014, 0.22, 16]} />
          <meshStandardMaterial color="#45ccff" transparent opacity={0.62} roughness={0.03} />
        </mesh>
      )}

      {Array.from({ length: 7 }).map((_, index) => (
        <group key={index} position={[-0.575, -0.23 + index * 0.095, 0.405]}>
          <mesh>
            <boxGeometry args={[0.08 + (index % 2 === 0 ? 0.04 : 0), 0.01, 0.012]} />
            <meshStandardMaterial color="#173642" roughness={0.28} />
          </mesh>
          {index % 2 === 0 && (
            <Text position={[-0.085, 0.002, 0.006]} fontSize={0.025} color="#173642" anchorX="right" anchorY="middle">
              {index * 10}
            </Text>
          )}
        </group>
      ))}

      <Text position={[0, 0.47, 0.405]} fontSize={0.045} color="#153641" anchorX="center">
        displacement tank
      </Text>

      <Html transform position={[0, 0.6, 0.02]} distanceFactor={5}>
        <button className="station-label" type="button">
          {submerged ? `Displaced ${sample.volume} mL` : 'Drop into water'}
        </button>
      </Html>
    </group>
  );
}

export default function DensityStation({ state, actions }) {
  const { objects, selectedObject, sample, weighed, submerged, density, samplePlacement } = state;
  const [dragId, setDragId] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const dropPoint = useMemo(() => new THREE.Vector3(), []);

  const completeDrop = (position) => {
    const toScale = position.distanceTo(scaleTarget);
    const toTank = position.distanceTo(tankTarget);
    if (toScale < 0.72) {
      actions.setSampleChosen(true);
      actions.setWeighed(true);
      actions.setSamplePlacement('scale');
    }
    if (toTank < 0.82) {
      actions.setSampleChosen(true);
      actions.setSubmerged(true);
      actions.setSamplePlacement('tank');
    }
  };

  const startDrag = (event, id) => {
    event.stopPropagation();
    actions.setSelectedObject(id);
    actions.setDraggingSample(true);
    setDragId(id);
    if (event.target.setPointerCapture) event.target.setPointerCapture(event.pointerId);
    if (event.ray.intersectPlane(dragPlane, dropPoint)) {
      setDragPosition(dropPoint.clone().sub(stationOffset));
    }
  };

  const moveDrag = (event) => {
    if (!dragId) return;
    event.stopPropagation();
    if (event.ray.intersectPlane(dragPlane, dropPoint)) {
      const next = dropPoint.clone().sub(stationOffset);
      next.x = THREE.MathUtils.clamp(next.x, -1.55, 1.7);
      next.z = THREE.MathUtils.clamp(next.z, -0.5, 0.5);
      setDragPosition(next);
    }
  };

  const endDrag = (event) => {
    if (!dragId) return;
    event.stopPropagation();
    const finalPosition = dragPosition ?? trayPositions[dragId];
    completeDrop(finalPosition);
    setDragId(null);
    setDragPosition(null);
    actions.setDraggingSample(false);
  };

  return (
    <group
      position={stationOffset}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <RoundedBox castShadow receiveShadow args={[3.78, 0.27, 1.52]} radius={0.06} position={[0, 1.04, 0]}>
        <meshStandardMaterial color="#eef4f6" roughness={0.25} metalness={0.05} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[3.56, 0.08, 1.3]} radius={0.04} position={[0, 1.23, 0]}>
        <meshStandardMaterial color="#162229" roughness={0.13} metalness={0.38} />
      </RoundedBox>

      <mesh receiveShadow visible={false} position={[0, 1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {Object.entries(objects).map(([id, object]) => (
        <SampleObject
          key={id}
          id={id}
          object={object}
          active={selectedObject === id}
          dragging={dragId === id}
          position={displayPositionFor(id, selectedObject, samplePlacement, dragId === id ? dragPosition : null)}
          onPointerDown={startDrag}
        />
      ))}

      <DigitalScale
        weighed={weighed}
        sample={sample}
        onClick={(event) => {
          event.stopPropagation();
          actions.setSampleChosen(true);
          actions.setWeighed(true);
          actions.setSamplePlacement('scale');
        }}
      />

      <WaterTank
        submerged={submerged}
        sample={sample}
        onClick={(event) => {
          event.stopPropagation();
          actions.setSampleChosen(true);
          actions.setSubmerged(true);
          actions.setSamplePlacement('tank');
        }}
      />

      <group position={[0, 1.72, -0.68]}>
        <RoundedBox args={[1.8, 0.54, 0.05]} radius={0.04}>
          <meshStandardMaterial color="#07151c" emissive="#082632" emissiveIntensity={0.45} roughness={0.22} />
        </RoundedBox>
        <Text position={[0, 0.13, 0.035]} fontSize={0.085} color="#73e2ff" anchorX="center">
          Density Station
        </Text>
        <Text position={[0, -0.08, 0.035]} fontSize={0.055} color="#e9fbff" anchorX="center" maxWidth={1.58}>
          {density ? `${sample.mass} g / ${sample.volume} mL = ${density.toFixed(2)} g/mL` : 'Drag sample to scale, then tank'}
        </Text>
      </group>
    </group>
  );
}
