import React, { useEffect, useContext } from 'react'
import DancefloorStore from 'stores/Dancefloor'
import Loader from 'components/Loader'
import Form from 'components/Form'
import Dancefloor from 'components/Dancefloor'

export default function App() {
  const { fetchDancefloor } = useContext(DancefloorStore)

  useEffect(fetchDancefloor, [])

  return (
    <>
      <Loader />
      <Form />
      <Dancefloor />
    </>
  )
}
