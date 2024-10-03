import { Canvas } from "@react-three/fiber"

import { Camera } from "./Camera"

import { CameraFoot } from "./CameraFoot"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { SurveillanceCam } from "./SurveillanceCam"
import { OrbitControls } from "@react-three/drei"
import { SurveillanceCamFoot } from "./SurveillanceCamFoot"
import { useEffect, useState } from "react"

import { MathUtils } from "three"

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }

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

  return (
    <main className="flex flex-row h-screen w-screen bg-gray-800 absolute cursor-auto">
      <div style={{ width: "22vw" }}>
        <Canvas className="" camera={{ position: [0, 0, 15], fov: 10 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {/* <Camera />
          <CameraFoot /> */}
          <SurveillanceCam />
          <SurveillanceCamFoot />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      <div className="flex flex-1 justify-center items-center mr-80 text-md relative top-2">
        <div className="flex flex-col gap-3 justify-center ">
          <button onClick={handleClick}>
            <AiOutlineArrowLeft />
          </button>
          <label>naam</label>
          <input className="bg-slate-400 w-80 p-1" />
          <label>e-mail</label>
          <input className="bg-slate-400 w-80 p-1" />
          <label>bericht</label>
          <input className="bg-slate-400 w-80 p-1" />
          <button className="border border-slate-500 p-1 text-center mt-2 cursor-pointer">
            Verstuur
          </button>
        </div>
      </div>
    </main>
  )
}

export default Contact
