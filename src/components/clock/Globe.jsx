/* eslint-disable no-irregular-whitespace */
import React, { useRef, useEffect, Suspense, useState } from 'react'; 
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei'; 
import { gsap } from 'gsap'; 
import { TextureLoader } from 'three';
import TIMEZONE_DATA from './timezoneData'; 

const GLOBE_RADIUS = 3;
const GLOBE_TILT_X = 0; 
const GLOBE_TEXTURE_OFFSET = 90;
const ROTATION_SPEED = 10; 
const RESUME_DELAY = 500; 

const latLonToVec3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180); 
    const theta = (lon + GLOBE_TEXTURE_OFFSET) * (Math.PI / 180); 
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
};

const Marker = React.memo(({ position }) => {
    const markerRef = useRef();
    useEffect(() => {
        gsap.to(markerRef.current.scale, {
            x: 1.5, y: 1.5, z: 1.5,
            duration: 0.8,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.2
        });
    }, []);

    return (
        <mesh ref={markerRef} position={position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#FF8C00" emissive="#FF8C00" emissiveIntensity={3} /> 
        </mesh>
    );
});

const AutoRotation = ({ globeRef, isUserInteracting, selectedCityName }) => {
    const selectedCity = TIMEZONE_DATA.find(c => c.name === selectedCityName);
    const rotationTweenRef = useRef(null);
    const timeoutRef = useRef(null); 
    
    const startAutoRotation = () => {
        if (!globeRef.current) return;
        if (rotationTweenRef.current) rotationTweenRef.current.kill();
        rotationTweenRef.current = gsap.to(globeRef.current.rotation, {
            y: `-=${Math.PI * 2}`,
            duration: 360 / ROTATION_SPEED, 
            ease: 'none',
            repeat: -1,
        });
    };

    const stopAutoRotation = () => {
        if (rotationTweenRef.current) rotationTweenRef.current.kill();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        startAutoRotation();
        return () => stopAutoRotation();
    }, []); 

    useEffect(() => {
        stopAutoRotation(); 
        if (!isUserInteracting) {
            timeoutRef.current = setTimeout(startAutoRotation, RESUME_DELAY);
        }
        
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isUserInteracting]);

    useEffect(() => {
        if (selectedCity && globeRef.current) {
            stopAutoRotation(); 
            
            const targetLng = selectedCity.lng; 
            const targetRotationY = ((targetLng - 90) * Math.PI) / 180;
            
            gsap.to(globeRef.current.rotation, {
                y: targetRotationY,
                duration: 1.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (!isUserInteracting) {
                        startAutoRotation(); 
                    }
                }
            });
        }
    }, [selectedCityName, selectedCity]);

    return null;
};


const GlobeContent = ({ selectedCityName }) => {
    const mapTexture = useLoader(TextureLoader, '/globe_texture.jpg'); 
    const globeRef = useRef();
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const selectedCity = TIMEZONE_DATA.find(c => c.name === selectedCityName);
    
    const handleStart = () => {
        setIsUserInteracting(true);
    };

    const handleEnd = () => {
        setIsUserInteracting(false); 
    };


    return (
        <group>
            <AutoRotation 
                globeRef={globeRef} 
                isUserInteracting={isUserInteracting} 
                selectedCityName={selectedCityName}
            />
            <group ref={globeRef} rotation={[GLOBE_TILT_X, 0, 0]}> 
                <Sphere args={[GLOBE_RADIUS, 64, 64]}>
                    <meshBasicMaterial 
                        map={mapTexture}
                        color="#ffffff"
                        toneMapped={false} 
                    />
                </Sphere>
                {selectedCity && (
                    <Marker 
                        position={latLonToVec3(selectedCity.lat, selectedCity.lng, GLOBE_RADIUS + 0.05)} 
                    />
                )}
            </group>
            <OrbitControls 
                enableRotate={true}
                enableZoom={false} 
                enablePan={false} 
                autoRotate={false} 
                onStart={handleStart} 
                onEnd={handleEnd} 
            />
        </group>
    );
};


const Globe = ({ selectedCityName }) => {
    return (
        <div className="w-full h-100 cursor-grab">
            
                <Canvas 
                    camera={{ position: [0, 0, 10], fov: 35 }}
                    dpr={[1, 2]} 
                >
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={3} color="#FFA500" />
                    <Suspense fallback={<Text color="white" anchorX="center" anchorY="middle">Loading Map...</Text>}>
                        <GlobeContent selectedCityName={selectedCityName} />
                    </Suspense>
                </Canvas>
            
        </div>
    );
};

export default Globe;