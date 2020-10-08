import { rest } from 'msw'

export const fetchDancefloorMock = rest.get('http://localhost:4000/dancefloor', (_, response, context) =>
  response(
    context.json({
      numberOfColumns: 4,
      numberOfRows: 2
    })
  )
)


export const saveDancefloorMock = rest.post('http://localhost:4000/dancefloor', (_, response, context) =>
  response(context.status(200))
)
