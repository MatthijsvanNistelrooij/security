import React, { useRef, useEffect } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

// import scene from "../assets/3d/low-poly_cctv_camera.glb"
import scene from "../assets/3d/security_camera.glb"

const Camera = ({ currentAnimation, position, scale, props }) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(scene)
  const { actions } = useAnimations(animations, group)


console.log(animations);

  useEffect(() => {
    if (currentAnimation) {
      // Reset and play the animation
      actions[currentAnimation]?.reset().play();
      // Set animation speed to 2x
      actions[currentAnimation]?.setEffectiveTimeScale(0.2);
    } else {
      // Stop all animations
      Object.values(actions).forEach((action) => action.stop());
    }
  }, [currentAnimation, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          position={position}
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={scale}
        >
          <group
            name="c51c39cda0864791a727b463821f505efbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="lcctv" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_12"
                      geometry={nodes.Object_12.geometry}
                      material={materials.lcctv}
                      skeleton={nodes.Object_12.skeleton}
                    />
                    <group
                      name="Object_11"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="lcctv_ref"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Camera
