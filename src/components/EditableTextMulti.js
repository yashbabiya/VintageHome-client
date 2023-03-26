import React from 'react'

export default function EditableTextMulti(props) {
  return (
    <textarea className={`input-border-less multi-line ${props.sx}`} {...props} ></textarea>
  )
}
