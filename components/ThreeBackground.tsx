"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // ==========================
        // Scene
        // ==========================

        const scene = new THREE.Scene();

        // ==========================
        // Camera
        // ==========================

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
        let particleCount = 200;

        const r = 800;

        const rHalf = r / 2;

        // ==========================
        // Controller
        // ==========================

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
        // Point Material
        // ==========================

        const pointMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: false,
        });

        // ==========================
        // Particle Geometry
        // ==========================

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
            new THREE.BufferAttribute(
                particlePositions,
                3
            ).setUsage(THREE.DynamicDrawUsage)
        );

        // ==========================
        // Point Cloud
        // ==========================

        const pointCloud = new THREE.Points(
            particles,
            pointMaterial
        );

        group.add(pointCloud);

        // ==========================
        // Line Geometry
        // ==========================

        const lineGeometry = new THREE.BufferGeometry();

        lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            ).setUsage(THREE.DynamicDrawUsage)
        );

        lineGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(
                colors,
                3
            ).setUsage(THREE.DynamicDrawUsage)
        );

        lineGeometry.computeBoundingSphere();

        lineGeometry.setDrawRange(0, 0);

        // ==========================
        // Line Material
        // ==========================

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const linesMesh = new THREE.LineSegments(
            lineGeometry,
            lineMaterial
        );

        group.add(linesMesh);
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

                // Bounce X
                if (
                    particlePositions[i * 3] < -rHalf ||
                    particlePositions[i * 3] > rHalf
                ) {
                    particleData.velocity.x *= -1;
                }

                // Bounce Y
                if (
                    particlePositions[i * 3 + 1] < -rHalf ||
                    particlePositions[i * 3 + 1] > rHalf
                ) {
                    particleData.velocity.y *= -1;
                }

                // Bounce Z
                if (
                    particlePositions[i * 3 + 2] < -rHalf ||
                    particlePositions[i * 3 + 2] > rHalf
                ) {
                    particleData.velocity.z *= -1;
                }

                if (
                    effectController.limitConnections &&
                    particleData.numConnections >= effectController.maxConnections
                ) {
                    continue;
                }

                for (let j = i + 1; j < particleCount; j++) {
                    const particleDataB = particlesData[j];

                    if (
                        effectController.limitConnections &&
                        particleDataB.numConnections >= effectController.maxConnections
                    ) {
                        continue;
                    }

                    const dx =
                        particlePositions[i * 3] -
                        particlePositions[j * 3];

                    const dy =
                        particlePositions[i * 3 + 1] -
                        particlePositions[j * 3 + 1];

                    const dz =
                        particlePositions[i * 3 + 2] -
                        particlePositions[j * 3 + 2];

                    const dist = Math.sqrt(
                        dx * dx +
                        dy * dy +
                        dz * dz
                    );

                    if (dist < effectController.minDistance) {
                        particleData.numConnections++;

                        particleDataB.numConnections++;

                        const alpha =
                            1.0 -
                            dist / effectController.minDistance;

                        // First Point
                        positions[vertexPos++] =
                            particlePositions[i * 3];

                        positions[vertexPos++] =
                            particlePositions[i * 3 + 1];

                        positions[vertexPos++] =
                            particlePositions[i * 3 + 2];

                        // Second Point
                        positions[vertexPos++] =
                            particlePositions[j * 3];

                        positions[vertexPos++] =
                            particlePositions[j * 3 + 1];

                        positions[vertexPos++] =
                            particlePositions[j * 3 + 2];

                        // Color A
                        colors[colorPos++] = alpha;
                        colors[colorPos++] = alpha;
                        colors[colorPos++] = alpha;

                        // Color B
                        colors[colorPos++] = alpha;
                        colors[colorPos++] = alpha;
                        colors[colorPos++] = alpha;

                        numConnected++;
                    }
                }
            }

            linesMesh.geometry.setDrawRange(
                0,
                numConnected * 2
            );

            (
                linesMesh.geometry.attributes.position as THREE.BufferAttribute
            ).needsUpdate = true;

            (
                linesMesh.geometry.attributes.color as THREE.BufferAttribute
            ).needsUpdate = true;

            (
                pointCloud.geometry.attributes.position as THREE.BufferAttribute
            ).needsUpdate = true;

            group.rotation.y =
                Date.now() * 0.0001;

            renderer.render(scene, camera);

            requestAnimationFrame(animate);
        };

        animate();    // ==========================
        // Cleanup
        // ==========================

        return () => {
            window.removeEventListener("resize", onWindowResize);

            renderer.dispose();

            particles.dispose();
            lineGeometry.dispose();

            pointMaterial.dispose();
            lineMaterial.dispose();

            if (
                renderer.domElement &&
                mountRef.current?.contains(renderer.domElement)
            ) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
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