import GamesIndexContainer from '../../../../app/javascript/react/containers/GamesIndexContainer.js'
import GameTile from '../../../../app/javascript/react/components/GameTile.js'

describe('GamesIndexContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <GamesIndexContainer />
    )
  })

  it('should have an GameTile component', () => {
    expect(wrapper.find(GameTile)).toBePresent()
  })

})
