import App from '../../../app/javascript/react/App.js'

describe('Home page should have content', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <App />
    )
  })

  it('should have an h1 tag', () => {
    expect(wrapper.find('h1').length).toEqual(1)
  })
})
