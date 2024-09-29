"use client";
import React from 'react'
import {useEffect, useState} from "react"

export default function Gallery() {
  const [videoPaths, setVideoPaths] = useState(["ChrisTPosingNerf.mp4", "DiegoChilling.mp4", "YosephSleeping.mp4"]);
  /*useEffect(getPaths = async () => {
  }, [])*/
  return (
    <div className="flex flex-wrap justify-center">
      {videoPaths && videoPaths.map((video, index)=> (
        <div className="w-[600px] h-[400px] mx-[75px] mt-[100px]" key={index}>
          <video width="600" height="400" controls autoPlay>
            <source src={`/renders/${video}`} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  )
}
