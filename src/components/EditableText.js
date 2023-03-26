import React from 'react'

export default function EditableText(props) {
  return (
    <input className={`input-border-less ${props.sx}`} {...props} />
  )
}
