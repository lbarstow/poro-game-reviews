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
    labelContents.simulate("change",labelContents)
    expect(labelContents.node.value).toEqual("Miska the Game")
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).not.toContain("Title is required")

  })
  it('contains a field name "Description" and an "Description" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Description:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("textarea")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed"
    labelContents.simulate("change",labelContents)
    expect(labelContents.node.value).toEqual("Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed")
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).not.toContain("Description is required")

  })
  it('contains a field name "Number of Players:" and an "Number of Players" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Number of Players:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("input")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "yay"
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "2"
    labelContents.simulate("change",labelContents)
    expect(labelContents.node.value).toEqual("2")
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).not.toContain("Minimum player count is required")
  })
  it('contains a field name "to" and an input field', () => {
    const label = wrapper.findWhere(n => n.text() === "to")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("input")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "yay"
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "2"
    labelContents.simulate("change",labelContents)
    expect(labelContents.node.value).toEqual("2")
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).not.toContain("Maximum player count is required")
  })
  it('contains a submit button', () => {
    const submit = wrapper.findWhere(n => n.node.value === "Submit")
    expect(submit.length).toEqual(1)
    expect(submit.type()).toEqual("button")

  })

  it('contains category checkboxes', () => {
    expect(wrapper.findWhere(n => n.node.type ==='checkbox').length).toEqual(12)
  })

  it('gives an error when title is blank',() => {

    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Title is required")
  })
  it('gives an error when description is blank',() => {

    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Description is required")
  })
  it('gives an error when description is less than 50 characters',() => {
    const label = wrapper.findWhere(n => n.text() === "Game Name:")
    const labelContents = label.children()
    labelContents.node.value = "This is not 50 characters"
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Description must be at least 50 characters")
  })
  it('gives an error when min players is blank',() => {

    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Minimum player count is required")
  })
  it('gives an error when max players is blank',() => {

    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Maximum player count is required")
  })

  it('gives an error when min players is not an integer',() => {
    const label = wrapper.findWhere(n => n.text() === "Number of Players:")
    const labelContents = label.children()
    labelContents.node.value = "1.2"
    labelContents.simulate("change", labelContents)
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Minimum player count must be an integer")
  })

  it('gives an error when min players is greater than max players',() => {
    const label = wrapper.findWhere(n => n.text() === "Number of Players:")
    const labelContents = label.children()
    labelContents.node.value = "3"
    labelContents.simulate("change", labelContents)
    const label2 = wrapper.findWhere(n => n.text() === "to")
    const labelContents2 = label2.children()
    labelContents2.node.value = "2"
    labelContents2.simulate("change", labelContents2)
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Maximum players must be greater than or equal to minimum players")
  })

  // it('redirects to the game index page on a successful submit', () => {
  //   const label = wrapper.findWhere(n => n.text() === "Game Name:")
  //   const labelContents = label.children()
  //   labelContents.node.value = "Miska: the Game"
  //   labelContents.simulate("change", labelContents)
  //   const label2 = wrapper.findWhere(n => n.text() === "Description:")
  //   const labelContents2 = label2.children()
  //   labelContents2.node.value = "Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed"
  //   labelContents2.simulate("change", labelContents2)
  //   const label3 = wrapper.findWhere(n => n.text() === "Number of Players:")
  //   const labelContents3 = label3.children()
  //   labelContents3.node.value = "1"
  //   labelContents3.simulate("change", labelContents3)
  //   const label4 = wrapper.findWhere(n => n.text() === "to")
  //   const labelContents4 = label4.children()
  //   labelContents4.node.value = "4"
  //   labelContents4.simulate("change", labelContents4)
  //   const form = wrapper.find('form')
  //   form.simulate('submit')
  //   expect(wrapper.text()).toContain("Poro Game Reviews")
  //
  // })

  //Above needs to simulate a fetch to work
})
