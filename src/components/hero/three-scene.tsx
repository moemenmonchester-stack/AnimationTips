'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      shape: THREE.Mesh,
      particles: THREE.Points;
    let mouseX = 0;
    let mouseY = 0;
    const clock = new THREE.Clock();

    const init = () => {
      scene = new THREE.Scene();
      const container = currentMount.parentElement;
      const width = container?.clientWidth || window.innerWidth;
      const height = container?.clientHeight || window.innerHeight * 0.8;
      
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.5, 0);
      const material = new THREE.MeshStandardMaterial({
        color: 0x4f46e5,
        roughness: 0.3,
        metalness: 0.6,
        wireframe: true,
      });
      shape = new THREE.Mesh(geometry, material);
      scene.add(shape);

      const particlesGeometry = new THREE.BufferGeometry();
      const count = 500;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
      }
      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xec4899,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 2); // Increased intensity
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onWindowResize = () => {
        const container = currentMount.parentElement;
        if (!camera || !renderer || !container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      shape.rotation.y = 0.3 * elapsedTime;
      shape.rotation.x = 0.3 * elapsedTime;
      particles.rotation.y = -0.05 * elapsedTime;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      if (renderer.domElement.parentElement === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-50" />
  );
};

export default ThreeScene;
