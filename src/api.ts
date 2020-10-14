import { DancefloorProperties } from 'stores/Dancefloor'

export const defaultDancefloor: DancefloorProperties = {
  numberOfColumns: 10,
  numberOfRows: 10
}

const sleep = (time = 500): Promise<void> => new Promise(resolve => setTimeout(resolve, time))

const fetchDancefloor = async (): Promise<DancefloorProperties> => {
  await sleep()
  return JSON.parse(localStorage.getItem('dancefloor')) || defaultDancefloor
}

const saveDancefloor = async (dancefloor: DancefloorProperties): Promise<void> => {
  await sleep()
  localStorage.setItem('dancefloor', JSON.stringify(dancefloor))
}

export default { fetchDancefloor, saveDancefloor }
