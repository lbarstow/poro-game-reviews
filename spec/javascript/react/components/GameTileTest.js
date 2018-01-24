import GameTile from '../../../../app/javascript/react/components/GameTile.js'

describe('GameTile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <GameTile
        name="Catan"
        description="This is described"
      />
    )
  })


  it('should have an h5 tag', () => {
    expect(wrapper.find('h5').length).toEqual(1)
  })

  it('should have expected content in h5 tag', () => {
    expect(wrapper.find('h5').text()).toBe('Catan')
  })

  it('should have an h6 tag', () => {
    expect(wrapper.find('h6').length).toEqual(1)
  })

  it('should have expected content in h6 tag', () => {
    expect(wrapper.find('h6').text()).toBe('Category')
  })

  it('should have a p tag', () => {
    expect(wrapper.find('p').length).toEqual(1)
  })

  it('should have expected content in p tag', () => {
    expect(wrapper.find('p').text()).toBe('This is described')
  })
})
