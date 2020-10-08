import React from 'react'
import styles from 'styles/Form.module.css'

export default function Form() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const handleNumberOfColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(parseInt(event.target.value))
  }

  const handleNumberOfRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(parseInt(event.target.value))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input placeholder="Set column quantity" type="number" min="0" max="20" onChange={handleNumberOfColumnsChange} />

      <input placeholder="Set row quantity" type="number" min="0" max="20" onChange={handleNumberOfRowsChange} />

      <button>Generate</button>
    </form>
  )
}
