import { useEffect, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { useAnimations, useGLTF, Text, SpotLight } from "@react-three/drei"
import {
  EffectComposer,
  DepthOfField,
  Vignette,
  Noise,
  Bloom,
} from "@react-three/postprocessing"

import shopScene from "../assets/3d/kitto_video_game_system.glb"
import { useSpring, animated } from "@react-spring/three"
import {
  AiFillCaretDown,
  AiFillGithub,
  AiFillHome,
  AiFillLinkedin,
} from "react-icons/ai"
import gsap from "gsap"
import { Planet } from "./Planet"
import ProjectCards from "./ProjectCards"

const ShopModel = ({ cursorX }) => {
  const modelRef = useRef()
  const { scene, animations } = useGLTF(shopScene)
  const { actions } = useAnimations(animations, modelRef)

  useEffect(() => {
    const model = modelRef.current
    if (model) {
      const rotationValue = cursorX / window.innerWidth / 50
      model.rotation.y = rotationValue
    }
  }, [cursorX])

  useEffect(() => {
    if (actions) {
      actions["Rain"]?.play()
    }
  }, [actions])

  return <primitive object={scene} ref={modelRef} />
}

const CameraAnimation = ({
  showSocials,
  showAbout,
  showProjects,
  showLinks,
}) => {
  const { camera } = useThree()

  useEffect(() => {
    if (showSocials) {
      gsap.to(camera.position, {
        x: 2,
        y: 4,
        z: 12,
        duration: 2,
        ease: "power2.inOut",
      })
      gsap.to(camera.rotation, {
        x: 0,
        y: 0.1,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      })
    } else if (showAbout) {
      gsap.to(camera.position, {
        x: 1,
        y: 4,
        z: 82,
        duration: 2,
        ease: "power2.inOut",
      })
      gsap.to(camera.rotation, {
        x: 0,
        y: 0.04,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      })
    } else if (showProjects) {
      gsap.to(camera.position, {
        x: 4,
        y: 22,
        z: 20,
        duration: 4,
        ease: "power2.inOut",
      })
      gsap.to(camera.rotation, {
        x: 0,
        y: 0.1,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      })
    } else if (showLinks) {
      gsap.to(camera.position, {
        x: 3.2,
        y: 0.56,
        z: 10,
        duration: 2,
        ease: "power2.inOut",
      })
      gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      })
    } else {
      gsap.to(camera.position, {
        x: -4.5,
        y: 0.6,
        z: 9,
        duration: 2,
        ease: "power2.inOut",
      })
      gsap.to(camera.rotation, {
        x: 0,
        y: -0.6,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      })
    }
  }, [showSocials, showAbout, showProjects, showLinks, camera])

  return null
}

const Shop = () => {
  const [cursorX, setCursorX] = useState(0)
  const [showLinks, setShowLinks] = useState(false)
  const [showSocials, setShowSocials] = useState(false)
  const [showSocialsDiv, setShowSocialsDiv] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showAboutDiv, setShowAboutDiv] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showProjectsDiv, setShowProjectsDiv] = useState(false)
  const [showProjectCards, setShowProjectCards] = useState(false)
  const [showCaretDown, setShowCaretDown] = useState(false)

  const { opacity: opacity1, positionY: positionY1 } = useSpring({
    opacity: showLinks ? 1 : 0,
    positionY: showLinks ? 0.35 : 10,
    config: { mass: 1, tension: 170, friction: 20 },
    delay: 0,
  })

  const { opacity: opacity2, positionY: positionY2 } = useSpring({
    opacity: showLinks ? 1 : 0,
    positionY: showLinks ? 0.5 : 10,
    config: { mass: 1, tension: 170, friction: 25 },
    delay: 200,
  })

  const { opacity: opacity3, positionY: positionY3 } = useSpring({
    opacity: showLinks ? 1 : 0,
    positionY: showLinks ? 0.65 : 10,
    config: { mass: 1, tension: 170, friction: 35 },
    delay: 300,
  })

  const { opacity: opacity4, positionY: positionY4 } = useSpring({
    opacity: showLinks ? 1 : 0,
    positionY: showLinks ? 0.01 : 10,
    config: { mass: 1, tension: 0, friction: 0 },
    delay: 0,
  })

  const { opacity: opacity5, positionY: positionY5 } = useSpring({
    opacity: showLinks ? 1 : 0,
    positionY: showLinks ? 0.1 : 10,
    config: { mass: 1, tension: 150, friction: 40 },
    delay: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorX(event.clientX)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleShowLink = () => {
    setShowLinks(!showLinks)
  }

  const handleClickSocials = () => {
    setShowSocials(!showSocials)
    setTimeout(() => {
      setShowSocialsDiv(true)
    }, 2000)
  }

  const handleClickAbout = () => {
    setShowAbout(!showAbout)
    setTimeout(() => {
      setShowAboutDiv(true)
    }, 2000)
  }

  const handleClickProjects = () => {
    setShowProjects(!showProjects)
    setTimeout(() => {
      setShowProjectsDiv(true)
    }, 3000)
    setTimeout(() => {
      setShowCaretDown(true)
    }, 5000)
  }

  const handlePointerOver = (event) => {
    document.body.style.cursor = "pointer"
    event.object.material.color.set("orange")
  }

  const handlePointerOut = (event) => {
    document.body.style.cursor = "auto"
    event.object.material.color.set("white")
  }

  const handleCloseProjects = () => {
    setShowProjects(false)
    setShowProjectsDiv(false)
  }

  const handleCloseSocials = () => {
    setShowSocials(false)
    setShowSocialsDiv(false)
  }

  const handleCloseAbout = () => {
    setShowAbout(false)
    setShowAboutDiv(false)
    setShowProjectCards(false)
  }

  const handleCloseLinks = () => {
    setShowLinks(false)
  }

  const handleShowProjects = () => {
    setShowProjectCards(!showProjectCards)
  }

  return (
    <div className="h-screen w-screen canvas-container">
      <Canvas
        camera={{
          position: [-3.2, 0.8, 11],
          fov: 11,
          rotation: [0, -0.45, 0],
        }}
      >
        <ambientLight intensity={1} color={"white"} />
        <directionalLight position={[1, 5, 5]} intensity={1} />
        <ShopModel cursorX={cursorX} />

        {/* <Rocket position={[2, 22, 8]} /> */}
        <Planet position={[-2.7, 20, -50]} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.002} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <DepthOfField
            focusDistance={cursorX > 1000 ? 200 : 0}
            focalLength={cursorX < 600 ? 1 : 0.02}
            bokehScale={
              cursorX < 400 ? 1 : cursorX < 800 ? 2 : cursorX < 1400 ? 3 : 4
            }
          />
          <CameraAnimation
            showSocials={showSocials}
            showAbout={showAbout}
            showProjects={showProjects}
            showLinks={showLinks}
          />
        </EffectComposer>
        <Text
          color={"orange"}
          fontSize={0.05}
          position={[0.03, 0.43, 1]}
          anchorX="center"
          anchorY="middle"
          onClick={handleShowLink}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          letterSpacing={0.1}
          fontWeight={"bold"}
          opacity={0.0}
          transparent
          padding={5}
        >
          {"\u00A0".repeat(25)}
        </Text>

        {showLinks && (
          <Text
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <animated.group position-y={positionY4}>
              <Text
                color="white"
                fontSize={0.15}
                position={[2, 0.75, -0.1]}
                anchorX="middle"
                anchorY="middle"
                onClick={handleCloseLinks}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                opacity={opacity4}
              >
                X
              </Text>
            </animated.group>
            <animated.group position-y={positionY3}>
              <Text
                color="white"
                fontSize={0.2}
                position={[2.8, 0.1, -0.1]}
                anchorX="middle"
                anchorY="middle"
                onClick={handleClickSocials}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                opacity={opacity3}
              >
                SOCIALS
              </Text>
            </animated.group>

            <animated.group position-y={positionY2}>
              <Text
                color="white"
                fontSize={0.2}
                position={[2.8, 0.07, -0.1]}
                anchorX="middle"
                anchorY="middle"
                onClick={handleClickAbout}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                opacity={opacity2}
              >
                ABOUT
              </Text>
            </animated.group>

            <animated.group position-y={positionY1}>
              <Text
                color="white"
                fontSize={0.2}
                position={[2.8, 0.04, -0.1]}
                anchorX="middle"
                anchorY="middle"
                onClick={handleClickProjects}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                opacity={opacity1}
              >
                PROJECTS
              </Text>
            </animated.group>
          </Text>
        )}
      </Canvas>
      {showSocialsDiv && (
        <div
          className="absolute top-1/2 left-1/2
       text-center font-bold p-16
       transform -translate-x-1/2 -translate-y-1/2
       hover:text-white text-4xl flex flex-row transition-transform 
       duration-300 ease-in-out gap-10 tracking-tight rounded-lg hover:shadow-lg hover:shadow-black"
        >
          <a
            href="#"
            onClick={handleCloseSocials}
            className="flex flex-row items-center gap-2 p-5 cursor:pointer"
          >
            <AiFillHome />
          </a>
          <a
            href="#"
            className="flex flex-row items-center gap-2 p-5 cursor:pointer"
          >
            <AiFillGithub />
          </a>
          <a
            href="/"
            className="flex flex-row items-center gap-2 p-5 cursor:pointer"
          >
            <AiFillLinkedin />
          </a>
        </div>
      )}
      {showAboutDiv && (
        <div
          className="absolute top-1/2 left-1/2
       text-center font-bold p-16
       transform -translate-x-1/2 -translate-y-1/2
       hover:text-white text-4xl flex flex-row transition-transform 
       duration-300 ease-in-out gap-10 tracking-tight rounded-lg hover:shadow-lg hover:shadow-black"
        >
          <a
            href="#"
            onClick={handleCloseAbout}
            className="flex flex-row items-center gap-2 p-5 cursor:pointer"
          >
            <AiFillHome />
          </a>
          <a
            href="#"
            onClick={handleShowProjects}
            className="flex flex-row items-center gap-2 p-5 cursor:pointer"
          >
            <AiFillGithub />
          </a>
          <a
            href="/"
            className="flex flex-row items-center gap-2 p-5 cursor:pointer"
          >
            <AiFillLinkedin />
          </a>
        </div>
      )}
      {showProjectsDiv && (
        <>
          {showCaretDown && (
            <>
              <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                <AiFillCaretDown
                  className="text-2xl hover:text-4xl cursor-pointer"
                  onClick={handleCloseProjects}
                  style={{ zIndex: 10 }}
                />
              </div>
            </>
          )}
          <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
            <ProjectCards />
          </div>
        </>
      )}
    </div>
  )
}

export default Shop
