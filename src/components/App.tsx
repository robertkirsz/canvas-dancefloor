import React, { useEffect, useContext } from 'react'
import DancefloorStore from 'stores/Dancefloor'
import FetchDancefloorSpinner from 'components/FetchDancefloorSpinner'
import Form from 'components/Form'
import Dancefloor from 'components/Dancefloor'

export default function App() {
  const { fetchDancefloor } = useContext(DancefloorStore)

  useEffect(fetchDancefloor, [])

  return (
    <>
      <FetchDancefloorSpinner />
      <Form />
      <Dancefloor />
    </>
  )
}
