require 'rails_helper'

RSpec.describe User, type: :model do
  it {should have_valid(:username).when('username_1')}
  it {should_not have_valid(:username).when(nil, '', ' ')}

  it {should have_valid(:email).when('user@example.com')}
  it {should_not have_valid(:email).when(nil, '', ' ')}

  it {should have_valid(:password).when('qwerty')}
  it {should_not have_valid(:password).when('qwer')}

  it 'has a matching password confirmation' do
    user = User.new
    user.password = 'password'
    user.password_confirmation = 'anotherpassword'

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end
end
