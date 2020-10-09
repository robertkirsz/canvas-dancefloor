import { DancefloorProperties } from 'stores/Dancefloor'

const sleep = (time: number = 1500): Promise<void> => new Promise(resolve => setTimeout(resolve, time))

const fetchDancefloor = async (): Promise<DancefloorProperties> => {
  const dancefloor: DancefloorProperties = JSON.parse(localStorage.getItem('dancefloor')) || {
    numberOfColumns: 4,
    numberOfRows: 2
  }

  await sleep(1000)
  return dancefloor
}

const saveDancefloor = async (data: DancefloorProperties): Promise<void> => {
  await sleep()
  localStorage.setItem('dancefloor', JSON.stringify(data))
}

export default { fetchDancefloor, saveDancefloor }
