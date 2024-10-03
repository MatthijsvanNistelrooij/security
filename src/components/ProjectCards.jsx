import React, { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Image, Text } from "@react-three/drei"
import {
  brainwave,
  apple_shop,
  banking_app,
  evently,
  summarize,
  webscraper,
  imagify,
} from "../projects"

const projects = [
  { id: 1, imageUrl: apple_shop, name: "Apple Shop" },
  { id: 2, imageUrl: banking_app, name: "Banking App" },
  { id: 3, imageUrl: evently, name: "Event Planner" },
  { id: 4, imageUrl: brainwave, name: "Brainwave" },
  { id: 5, imageUrl: summarize, name: "Summarize" },
  { id: 6, imageUrl: webscraper, name: "Webscraper" },
  { id: 7, imageUrl: imagify, name: "Image AI" },
]

const Carousel = () => {
  const ref = useRef()
  const [dragging, setDragging] = useState(false)
  const [draggingCard, setDraggingCard] = useState(null)
  const [startX, setStartX] = useState(0)
  const [startRotation, setStartRotation] = useState(0)
  const [hovered, setHovered] = useState(false)
  const rotationSpeed = 0.001
  const radius = 5.5
  const numCards = projects.length

  useFrame(() => {
    if (ref.current && !hovered) {
      ref.current.rotation.y += rotationSpeed
    }
  })

  const handleMouseDown = (event, cardIndex) => {
    setDragging(true)
    setDraggingCard(cardIndex)
    setStartX(event.clientX)
    setStartRotation(ref.current.rotation.y)
  }

  const handleMouseMove = (event) => {
    if (dragging && draggingCard !== null) {
      const deltaX = event.clientX - startX
      ref.current.rotation.y = startRotation + deltaX * 0.001 // Reversed rotation direction
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
    setDraggingCard(null)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [dragging, draggingCard, startX, startRotation])

  return (
    <group ref={ref}>
      {projects.map((project, index) => {
        const angle = (index / numCards) * Math.PI * 2
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)

        return (
          <ProjectCard
            key={project.id}
            imageUrl={project.imageUrl}
            position={[x, 0, z]}
            onMouseDown={(event) => handleMouseDown(event, index)}
            onHover={() => setHovered(true)}
            onUnhover={() => setHovered(false)}
          />
        )
      })}
    </group>
  )
}

const ProjectCard = ({
  imageUrl,
  position,
  onMouseDown,
  onHover,
  onUnhover,
}) => {
  const ref = useRef()

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position) // Ensure card faces the camera
    }
  })

  return (
    <Image
      ref={ref}
      url={imageUrl}
      scale={[8, 5, 1]}
      position={position}
      onPointerDown={onMouseDown}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
    />
  )
}

const ProjectCards = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <Carousel />
    </Canvas>
  )
}

export default ProjectCards
