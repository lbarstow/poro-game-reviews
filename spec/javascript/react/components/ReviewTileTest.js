import ReviewTile from '../../../../app/javascript/react/components/ReviewTile.js';

describe('ReviewTile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ReviewTile
        rating={4}
        body="This is my review body."
        victory_points={-5}
      />
    )
  })


  it('should have two h2 tags', () => {
    expect(wrapper.find('h2').length).toEqual(2)
  })

  it('should have correct text in first h2 tag', () => {
    expect(wrapper.find('h2').at(0).text()).toBe('Rating: 4')
  })

  it('should have "Review:" as text of first h2 tag', () => {
    expect(wrapper.find('h2').at(1).text()).toBe('Review:')
  })

  it('should have a p tag containing the review body', () => {
    expect(wrapper.find('p').text()).toBe("This is my review body.")
  })

  it('should have a span containing the victory points', () => {
    expect(wrapper.find('span').at(1).text()).toEqual("-5")
  })

  it('should have a span containing the Postedby:', () => {
    expect(wrapper.find('span').at(0).text()).toEqual("Posted by:")
  })


})
