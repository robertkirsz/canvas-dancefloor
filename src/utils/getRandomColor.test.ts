import getRandomColor from 'utils/getRandomColor'

describe('getRandomColor function', () => {
  it('Returns color value as a string in hex format', () => {
    const value = getRandomColor()

    expect(typeof value).toEqual('string')
    expect(value[0]).toEqual('#')
    expect(value).toHaveLength(7)
  })
})
