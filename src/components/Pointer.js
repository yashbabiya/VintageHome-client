import React from 'react'
import { useSelector } from 'react-redux';
import useMouse from '../helpers/useMouse';

export default function Pointer() {
  const { x, y } = useMouse();
  const pointer = useSelector((state)=>state.pointer)
  const styleHover = window.screen.availWidth>1035  ? {
    display: "block",
    position: "absolute",
    top: y ,
    left: x ,
    pointerEvent:'none',
    width: 400,
  }:{
    display:'none'
  };
  return (
    <div className={pointer.className} style={styleHover}></div>

  )
}
