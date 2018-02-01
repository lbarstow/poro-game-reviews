import GameShowTile from '../../../../app/javascript/react/components/GameShowTile.js';

describe('GameShowTile', () => {
  let wrapper;
  let gd= "This is a very fun game. It's so fun i wrote a description";
  let cats = "Category 1, Category 2";
  let gName= "Test Game";
  let rating= "4.3"
  beforeEach(() => {
    wrapper = mount(
      <GameShowTile
        name={gName}
        categories={cats}
        min_players={1}
        max_players={4}
        description={gd}
        average_rating={rating}
      />
    )
  })


  it('should have a h1 tag containing the game name', () => {
    expect(wrapper.find('h1').length).toEqual(1)
    expect(wrapper.find('h1').text()).toBe(gName)
  })



  it('should have two h3 tags', () => {
    expect(wrapper.find('h3').length).toEqual(2)
  })

  it('should have an h3 tag containing the list of categories', () => {
    expect(wrapper.find('h3').at(0).text()).toBe(`Category: ${cats}`)
  })

  it('should have an h3 tag containing the list of categories', () => {
    expect(wrapper.find('h3').at(1).text()).toBe(`Players: 1 to 4 players`)
  })

  it('should have a p tag the game description', () => {
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').text()).toBe(gd)
  })
  it('should have an h4 tag with the rating', () => {
    expect(wrapper.find('h4').length).toEqual(1);
    expect(wrapper.find('h4').text()).toBe(`Average Rating: ${rating}`);
  })
})
