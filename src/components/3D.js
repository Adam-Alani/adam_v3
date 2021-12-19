import * as THREE from 'three'
import {useEffect, useRef} from 'react'
import { useGLTF } from '@react-three/drei'
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useCompoundBody, usePlane, useSphere} from "@react-three/cannon";



useGLTF.preload("/3dObjects/logo3.glb")

export function Logo() {

    const sphereMaterial = new THREE.MeshLambertMaterial({ color: "#797979"})
    const ref = useRef()
    const { nodes } = useLoader(GLTFLoader,"/3dObjects/logo3.glb")
    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        ref.current.scale.set(50,50,50)
        ref.current.rotation.set(1.57 + Math.cos(t / 4.5) / 10, Math.sin(t / 4) / 10, 0.1 - (1 + Math.sin(t / 4)) / 10)
        ref.current.position.y = (1 + Math.sin(t / 2)) / 10 + 1
    })

    return (
        <group dispose={null}>
            <group ref={ref} >
                <group >
                    <mesh castShadow receiveShadow geometry={nodes.Curve006.geometry} material={sphereMaterial} />
                </group>
            </group>
        </group>
    )
}


const sphereGeometry = new THREE.SphereGeometry(1, 21, 21)
export function Spheres({ vec = new THREE.Vector3(), color, ...props }) {
    const [ref, api] = useCompoundBody(() => ({
        ...props,
        shapes: [
            { type: "Sphere", args: props.args },
        ],
    }))
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: color.color})

    useEffect(() => api.position.subscribe((p) => api.applyForce(vec.set(...p).normalize().multiplyScalar(-props.args * 35).toArray(), [0, 15, 0])), [api]) // prettier-ignore
    return (
        <group ref={ref} dispose={null}>
            <mesh castShadow receiveShadow scale={props.args} geometry={sphereGeometry} material={sphereMaterial} />
        </group>
    )
}




export function Collisions() {
    const viewport = useThree((state) => state.viewport)
    usePlane(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }))
    usePlane(() => ({ position: [0, 0, 8], rotation: [0, -Math.PI, 0] }))
    usePlane(() => ({ position: [0, -4, 0], rotation: [-Math.PI / 2, 0, 0] }))
    usePlane(() => ({ position: [0, 4, 0], rotation: [Math.PI / 2, 0, 0] }))
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [2] }))
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 2.5))
}
