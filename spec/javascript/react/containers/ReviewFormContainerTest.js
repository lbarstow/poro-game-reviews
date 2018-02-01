import ReviewFormContainer from '../../../../app/javascript/react/containers/ReviewFormContainer.js'

describe('ReviewFormContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ReviewFormContainer/>
    )
  })

  it('should have a header that says "New Review Form"', () => {
    expect(wrapper.find('h2').length).toEqual(1)
    expect(wrapper.find('h2').text()).toBe("New Review Form")
  })

  it('has a form element', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })

  it('contains a field name "Rating" and an "Rating" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Rating:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("input")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "4"
    labelContents.simulate("change",labelContents)
    expect(labelContents.node.value).toEqual("4")
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).not.toContain("Rating is Required")
  })

  it('contains a field name "Review" and an "Review" input field', () => {
    const label = wrapper.findWhere(n => n.text() === "Review:")
    expect(label.length).toEqual(1)
    const labelContents = label.children()
    expect(labelContents.length).toEqual(1)
    expect(labelContents.type()).toEqual("textarea")
    expect(labelContents.node.value).toEqual("")
    labelContents.node.value = "Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed"
    labelContents.simulate("change",labelContents)
    expect(labelContents.node.value).toEqual("Such a wonderful, joyful, amazing and fun fun fun Game. Very cool indeed")
  })

  it('contains a submit button', () => {
    const submit = wrapper.findWhere(n => n.node.value === "Submit")
    expect(submit.length).toEqual(1)
    expect(submit.type()).toEqual("button")
  })

  it('gives an error when rating is blank',() => {
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(wrapper.text()).toContain("Rating is Required")
  })
})
