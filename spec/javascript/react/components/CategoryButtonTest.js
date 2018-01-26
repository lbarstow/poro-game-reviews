import CategoryButton from '../../../../app/javascript/react/components/CategoryButton.js'

describe('GameTile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <CategoryButton
        name="Deck Builder"

      />
    )
  })


  it('should have an a tag', () => {
    expect(wrapper.find('a').length).toEqual(1)
  })

  it('should have correct text'), () => {
    expect(wrapper.find('a').text).toBe("Deck Builder")
  }
})
