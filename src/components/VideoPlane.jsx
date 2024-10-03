import { useRef, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { VideoTexture } from "three"

const VideoPlane = ({ zIndex, play }) => {
  const planeRef = useRef()
  const { gl } = useThree()

  useEffect(() => {
    const video = document.getElementById("video")
    if (!video) {
      console.error("Video element not found!")
      return
    }

    // Set up the texture
    const texture = new VideoTexture(video)
    if (planeRef.current) {
      planeRef.current.material.map = texture
      texture.needsUpdate = true
    }

    // Handle play/pause based on the `play` prop
    if (play) {
      video.play().catch((err) => console.error("Error playing video:", err))
    } else {
      video.pause()
    }

    // Cleanup function
    return () => {
      video.pause()
      video.src = ""
    }
  }, [gl, play]) // Include `play` in the dependency array

  return (
    <mesh
      ref={planeRef}
      position={[0.02, 0.01, 5]}
      scale={[0.015, 0.015, 0.015]}
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default VideoPlane
