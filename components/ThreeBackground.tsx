"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // ==========================
        // Scene & Camera
        // ==========================
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            4000
        );
        camera.position.z = 1750;

        // ==========================
        // Renderer
        // ==========================
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // ==========================
        // Main Group
        // ==========================
        const group = new THREE.Group();
        scene.add(group);

        // ==========================
        // Particle Constants
        // ==========================
        const maxParticleCount = 300;
        let particleCount = 220;
        const r = 800;
        const rHalf = r / 2;

        const effectController = {
            showDots: true,
            showLines: true,
            minDistance: 150,
            limitConnections: false,
            maxConnections: 20,
            particleCount: 500,
        };

        // ==========================
        // Arrays
        // ==========================
        const particlesData: {
            velocity: THREE.Vector3;
            numConnections: number;
        }[] = [];

        const segments = maxParticleCount * maxParticleCount;
        const positions = new Float32Array(segments * 3);
        const colors = new Float32Array(segments * 3);
        const particlePositions = new Float32Array(maxParticleCount * 3);

        // ==========================
        // Point Material & Geometry
        // ==========================
        const pointMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: false,
        });

        const particles = new THREE.BufferGeometry();

        for (let i = 0; i < maxParticleCount; i++) {
            const x = Math.random() * r - r / 2;
            const y = Math.random() * r - r / 2;
            const z = Math.random() * r - r / 2;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            particlesData.push({
                velocity: new THREE.Vector3(
                    -1 + Math.random() * 2,
                    -1 + Math.random() * 2,
                    -1 + Math.random() * 2
                ),
                numConnections: 0,
            });
        }

        particles.setDrawRange(0, particleCount);
        particles.setAttribute(
            "position",
            new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage)
        );

        const pointCloud = new THREE.Points(particles, pointMaterial);
        group.add(pointCloud);

        // ==========================
        // Line Geometry
        // ==========================
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
        );
        lineGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
        );
        lineGeometry.computeBoundingSphere();
        lineGeometry.setDrawRange(0, 0);

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        group.add(linesMesh);

        // ==========================
        // Mouse Tracking (New)
        // ==========================
        const mouse3D = new THREE.Vector3(0, 0, 0);
        let targetRotationY = 0;
        let targetRotationX = 0;

        const onMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Parallax effect for the whole group
            targetRotationY = x * 0.3; 
            targetRotationX = -y * 0.2;

            // Convert 2D screen mouse to 3D world coordinates
            const vector = new THREE.Vector3(x, y, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            mouse3D.copy(camera.position).add(dir.multiplyScalar(distance));
        };

        window.addEventListener("mousemove", onMouseMove);

        // ==========================
        // Resize Handler
        // ==========================
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onWindowResize);

        // ==========================
        // Animation
        // ==========================
        const animate = () => {
            let vertexPos = 0;
            let colorPos = 0;
            let numConnected = 0;

            // Reset connections
            for (let i = 0; i < particleCount; i++) {
                particlesData[i].numConnections = 0;
            }

            for (let i = 0; i < particleCount; i++) {
                const particleData = particlesData[i];

                particlePositions[i * 3] += particleData.velocity.x;
                particlePositions[i * 3 + 1] += particleData.velocity.y;
                particlePositions[i * 3 + 2] += particleData.velocity.z;

                // Bounce X, Y, Z
                if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) particleData.velocity.x *= -1;
                if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf) particleData.velocity.y *= -1;
                if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf) particleData.velocity.z *= -1;

                if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections) continue;

                // Check connection to OTHER particles
                for (let j = i + 1; j < particleCount; j++) {
                    const particleDataB = particlesData[j];
                    if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections) continue;

                    const dx = particlePositions[i * 3] - particlePositions[j * 3];
                    const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                    const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < effectController.minDistance) {
                        particleData.numConnections++;
                        particleDataB.numConnections++;

                        const alpha = 1.0 - dist / effectController.minDistance;

                        positions[vertexPos++] = particlePositions[i * 3];
                        positions[vertexPos++] = particlePositions[i * 3 + 1];
                        positions[vertexPos++] = particlePositions[i * 3 + 2];

                        positions[vertexPos++] = particlePositions[j * 3];
                        positions[vertexPos++] = particlePositions[j * 3 + 1];
                        positions[vertexPos++] = particlePositions[j * 3 + 2];

                        colors[colorPos++] = alpha; colors[colorPos++] = alpha; colors[colorPos++] = alpha; // White lines
                        colors[colorPos++] = alpha; colors[colorPos++] = alpha; colors[colorPos++] = alpha;

                        numConnected++;
                    }
                }

                // === CURSOR INTERACTION LOGIC ===
                // Check connection to MOUSE
                const mdx = particlePositions[i * 3] - mouse3D.x;
                const mdy = particlePositions[i * 3 + 1] - mouse3D.y;
                const mdz = particlePositions[i * 3 + 2] - mouse3D.z;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy + mdz * mdz);

                const mouseInteractionDistance = 250; // Radius of cursor effect

                if (mDist < mouseInteractionDistance) {
                    const alpha = 1.0 - mDist / mouseInteractionDistance;

                    positions[vertexPos++] = particlePositions[i * 3];
                    positions[vertexPos++] = particlePositions[i * 3 + 1];
                    positions[vertexPos++] = particlePositions[i * 3 + 2];

                    positions[vertexPos++] = mouse3D.x;
                    positions[vertexPos++] = mouse3D.y;
                    positions[vertexPos++] = mouse3D.z;

                    // Neon Cyan color for mouse lines
                    colors[colorPos++] = alpha * 0.2; 
                    colors[colorPos++] = alpha * 0.8; 
                    colors[colorPos++] = alpha * 1.0;

                    colors[colorPos++] = alpha * 0.2; 
                    colors[colorPos++] = alpha * 0.8; 
                    colors[colorPos++] = alpha * 1.0;

                    numConnected++;
                }
            }

            linesMesh.geometry.setDrawRange(0, numConnected * 2);
            (linesMesh.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
            (linesMesh.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
            (pointCloud.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

            // Smooth Parallax rotation based on mouse
            group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
            group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // ==========================
        // Cleanup
        // ==========================
        return () => {
            window.removeEventListener("resize", onWindowResize);
            window.removeEventListener("mousemove", onMouseMove);

            renderer.dispose();
            particles.dispose();
            lineGeometry.dispose();
            pointMaterial.dispose();
            lineMaterial.dispose();

            if (renderer.domElement && mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none"
        />
    );
}