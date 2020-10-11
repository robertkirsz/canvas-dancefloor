import React from 'react'
import styles from 'styles/Spinner.module.css'

interface Props {
  position?: 'center' | 'top-right' | 'bottom-right'
  children?: React.ReactNode
}

export default function Spinner({ position = 'center', children = 'Loading' }: Props) {
  return (
    <div className={`${styles.wrapper} ${styles[position]}`}>
      {children}
      <span className="spinner-dot">.</span>
      <span className="spinner-dot">.</span>
      <span className="spinner-dot">.</span>
    </div>
  )
}
