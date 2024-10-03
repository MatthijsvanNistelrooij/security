import React, { useEffect, useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import scene from "../assets/3d/cctv_camera.glb"
import { MathUtils } from "three"

export function Camera(props) {
  const group = useRef()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { nodes, materials } = useGLTF(scene)

  const handleMouseMove = (event) => {
    setMousePos({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (group.current) {
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        (mousePos.x * Math.PI) / 5,
        0.1
      )

      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        -(mousePos.y * Math.PI) / 20,
        0.1
      )
    }
  }, [mousePos])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0.4]}>
          <group
            name="Camerafbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.015}
            position={[0, 0.44, 0.3]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Camera_map}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.Lens_map}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials.Camera_map}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="Object_9" />
                  <group name="Object_11" />
                  <group name="Base">
                    <group name="Stem">
                      <group name="Camera" />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(scene)
