import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Environment, OrbitControls, PerspectiveCamera, Preload, SoftShadows } from '@react-three/drei';
import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing';
import LabRoom from './LabRoom.jsx';
import DensityStation from './DensityStation.jsx';
import ExperimentStation from './ExperimentStation.jsx';
import TeacherSpawn from './TeacherSpawn.jsx';

export default function LabScene({ state, actions, activeLab }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.65]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [5.6, 3.0, 6.2], fov: 45 }}
    >
      <color attach="background" args={['#0d1720']} />
      <fog attach="fog" args={['#0d1720', 9, 21]} />
      <PerspectiveCamera makeDefault position={[5.6, 3.0, 6.2]} fov={45} />
      <SoftShadows size={28} samples={12} focus={0.45} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[2, 7, 4]}
        intensity={2.6}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-5, 3.4, -2]} intensity={0.85} color="#66dcff" />
      <pointLight position={[4, 2.7, -4]} intensity={0.55} color="#fff3d2" />

      <LabRoom lab={activeLab} />
      {activeLab?.id === 'density-lab' ? (
        <DensityStation state={state} actions={actions} />
      ) : (
        <ExperimentStation lab={activeLab} state={state} actions={actions} />
      )}
      <TeacherSpawn visible={state.teacherVisible} hintCount={state.hintCount} />

      <Environment preset="city" />
      <EffectComposer multisampling={0}>
        <SMAA />
        <Bloom intensity={0.18} luminanceThreshold={0.7} luminanceSmoothing={0.32} />
        <Vignette eskil={false} offset={0.22} darkness={0.5} />
      </EffectComposer>
      <OrbitControls
        makeDefault
        enabled={!state.draggingSample}
        enableDamping
        dampingFactor={0.065}
        target={[0, 1.15, 0]}
        minDistance={3.2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2.05}
      />
      <AdaptiveDpr pixelated />
      <Preload all />
    </Canvas>
  );
}
