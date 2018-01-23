import GameTile from '../../../../app/javascript/react/components/GameTile.js'

describe('GameTile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <GameTile />
    )
  })

  it('should have an p tag', () => {
    expect(wrapper.find('p').length).toEqual(1)
  })

  it('should have expected content in p tag', () => {
    expect(wrapper.find('p').text()).toBe('This is a GameTile')
  })
})
