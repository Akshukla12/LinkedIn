import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * 3D Floating Shapes Background
 * Professional Three.js animated background with floating geometric shapes
 */
const FloatingShapes3D = ({ className = '' }) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const shapesRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x3b82f6, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Create floating shapes
        const shapes = [];
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 32, 32),
            new THREE.TetrahedronGeometry(0.4),
            new THREE.OctahedronGeometry(0.3),
            new THREE.TorusGeometry(0.3, 0.1, 16, 100),
        ];

        const materials = [
            new THREE.MeshPhongMaterial({
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.6,
                shininess: 100,
            }),
            new THREE.MeshPhongMaterial({
                color: 0x8b5cf6,
                transparent: true,
                opacity: 0.6,
                shininess: 100,
            }),
            new THREE.MeshPhongMaterial({
                color: 0x06b6d4,
                transparent: true,
                opacity: 0.6,
                shininess: 100,
            }),
        ];

        // Create 15 random shapes
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)].clone();
            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 5;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            scene.add(mesh);
            shapes.push(mesh);

            // Animate with GSAP
            gsap.to(mesh.rotation, {
                x: mesh.rotation.x + Math.PI * 2,
                y: mesh.rotation.y + Math.PI * 2,
                duration: 10 + Math.random() * 10,
                repeat: -1,
                ease: 'none',
            });

            gsap.to(mesh.position, {
                y: mesh.position.y + (Math.random() - 0.5) * 2,
                duration: 3 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        shapesRef.current = shapes;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update camera position based on mouse
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

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
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);

            shapes.forEach((shape) => {
                scene.remove(shape);
                shape.geometry.dispose();
                shape.material.dispose();
            });

            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
            style={{ opacity: 0.3 }}
        />
    );
};

export default FloatingShapes3D;
