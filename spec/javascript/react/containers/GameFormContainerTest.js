import GameFormContainer from '../../../../app/javascript/react/containers/GameFormContainer.js'

describe('GameFormContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <GameFormContainer/>
    )
  })

  it('should have a header that says "New Game Form"', () => {
    expect(wrapper.find('h2').length).toEqual(1)
    expect(wrapper.find('h2').text()).toBe("New Game Form")
  })
  it('has a form element', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })
  it('contains a field name "Game Name" and an "Game Name" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Game Name:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("input")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "Miska the Game"
    expect(labelContents.node.value).toEqual("Miska the Game")
  })
  it('contains a field name "Description" and an "Description" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Description:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("textarea")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed"
    expect(labelContents.node.value).toEqual("Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed")
  })
  it('contains a field name "Number of Players:" and an "Number of Players" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Number of Players:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("input")
    expect(labelContents.node.value).toEqual("1")
    labelContents.node.value = "yay"
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "2"
    expect(labelContents.node.value).toEqual("2")
  })
  it('contains a field name "to" and an input field', () => {
    const label = wrapper.findWhere(n => n.text() === "to")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("input")
    expect(labelContents.node.value).toEqual("1")
    labelContents.node.value = "yay"
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "2"
    expect(labelContents.node.value).toEqual("2")
  })
  it('contains a submit button', () => {
    const submit = wrapper.findWhere(n => n.node.value === "Submit")
    expect(submit.length).toEqual(1)
    expect(submit.type()).toEqual("input")

  })
})
