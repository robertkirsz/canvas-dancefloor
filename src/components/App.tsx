import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import DancefloorStore from 'stores/Dancefloor'
import Spinner from 'components/Spinner'
import Form from 'components/Form'
import Dancefloor from 'components/Dancefloor'

function App() {
  const { fetchingStatus, savingStatus, fetchDancefloor } = useContext(DancefloorStore)

  useEffect(fetchDancefloor, [])

  return (
    <>
      <Form />
      <Dancefloor />
      {fetchingStatus === 'pending' && <Spinner position="center">Loading</Spinner>}
      {savingStatus === 'pending' && <Spinner position="top-right">Saving</Spinner>}
    </>
  )
}

export default observer(App)
