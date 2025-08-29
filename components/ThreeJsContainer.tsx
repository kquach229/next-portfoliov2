'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Loading from '@/app/loading';
import { motion } from 'motion/react';

const ThreeJsContainer = ({ filePath }: { filePath: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 105;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.enableZoom = true;

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Model + animations
    const loader = new GLTFLoader();
    let dragon: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    loader.load(
      filePath,
      (gltf) => {
        dragon = gltf.scene;
        dragon.scale.set(0.5, 0.5, 0.5);
        scene.add(dragon);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(dragon);
          gltf.animations.forEach((clip) => {
            const action = mixer!.clipAction(clip);
            action.play();
          });
        }

        // Model finished loading
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF:', error);
        // Model finished loading
        setLoading(false);
      }
    );

    // Clock for animations
    const clock = new THREE.Clock();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      // Optional: rotate the dragon if you want it to spin as well
      if (dragon) {
        dragon.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [filePath]);

  // comment
  return (
    <div className='relative w-full h-screen'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-background'>
          <Loading />
        </div>
      )}

      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}>
        <div ref={mountRef} className='w-full h-full' />
      </motion.div>
    </div>
  );
};

export default ThreeJsContainer;
