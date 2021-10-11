import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useCompoundBody, useSphere } from "@react-three/cannon"
import { Environment, useGLTF, ContactShadows, } from "@react-three/drei"
import {Collisions, Logo, Spheres} from "../components/3D";
import Post from "../components/Post";
import useIntersection from "../hooks/useIntersection";
import {useRef} from "react";
useGLTF.preload('/3dObjects/logo.glb')

const spheres = [...Array(35)].map(() => ({ args: [0.6, 0.6, 0.8, 0.8, 1][Math.floor(Math.random() * 5)], mass: 1, angularDamping: 0.2, linearDamping: 0.95 }))





const Home = ({hidden}) => {

    const ref = useRef();
    const inViewport = useIntersection(ref, '0px')

    return (
        <>
            <div className="absolute inset-0 w-full h-full pointer-events-none bg-primary">
                <div className="w-full h-screen font-Work-Sans font-black   flex flex-col items-center leading-none tracking-widest justify-center">
                    <h1 ref={ref} className={`transition ${inViewport && !hidden? 'fade-in ' : ''} text-dark`} style={{fontSize: "22vw",fontFamily: "Inter"}}>Adam</h1>
                    <h1 ref={ref} className={`transition ${inViewport && !hidden? 'fade-in ' : ''} text-dark`} style={{fontSize: "22vw",fontFamily: "Inter"}}>Alani.</h1>
                </div>
            </div>
            <div className="h-screen w-screen max-w-full ">
                <Canvas
                    shadows
                    gl={{
                        stencil: false,
                        depth: false,
                        alpha: true,
                        antialias: false,
                    }}
                    camera={{ position: [0, 0, 20], fov: 50, near: 1, far: 40 }}>
                    <ambientLight intensity={1} />
                    <directionalLight
                        position={[50, 50, 25]}
                        angle={0.3}
                        intensity={2}
                        castShadow
                        shadow-mapSize-width={64}
                        shadow-mapSize-height={64}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} />

                    <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
                        <Collisions />
                        {spheres.map((props, i) => <Spheres key={i} {...props} />) /* prettier-ignore */}
                    </Physics>

                    {/*<Model/>*/}

                    <Logo/>
                    <ContactShadows frames={1} rotation-x={[Math.PI / 2]} position={[0, -0.33, 0]} far={0.4} width={2} height={2} blur={4} />



                    <Environment files="/adamsbridge.hdr" />
                    <Post/>
                </Canvas>
            </div>
        </>


    )

};

export default Home;
