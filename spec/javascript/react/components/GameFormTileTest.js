import GameFormTile from '../../../../app/javascript/react/components/GameFormTile.js';

describe('GameFormTile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <GameFormTile />
    )
  });

  it('should have an h5 tag', () => {
    expect(wrapper.find('h5').length).toEqual(1);
  });

  it('should have expected content in h5 tag', () => {
    expect(wrapper.find('h5').text()).toBe('Add New Game')
  })

  it('should have an i tag', () => {
    expect(wrapper.find('i').length).toEqual(1)
  })


})
