require "rails_helper"

feature 'user is able to edit his account', %Q{
  As a user
  I want to edit my account information
  So that I can keep my account up to date
} do

  # Acceptance Criteria:
  # * I must specify a valid email address,
  #   password, and password confirmation
  # * If I don't specify the required information, I am presented with
  #   an error message

  scenario 'provide updated information' do
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'Password', with: 'banana'
    fill_in 'Password confirmation', with: 'banana'
    fill_in 'Username', with: 'username_1'
    attach_file 'Profile photo', "#{Rails.root}/spec/support/images/photo.jpeg"

    click_button 'Sign up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Sign Out')

    visit edit_user_registration_path

    expect(page).to have_content('Edit Your Profile')
    expect(page).to have_content('Sign Out')

    fill_in 'Email', with: 'jane@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    fill_in 'Current password', with: 'banana'
    attach_file 'Profile photo', "#{Rails.root}/spec/support/images/photo2.jpeg"


    click_button 'Update'
    expect(page).to have_css("img[src*='thumb_photo2.jpeg']")

  end

  scenario 'user must provide current password to update the account' do
    visit new_user_registration_path

    fill_in 'Email', with: 'john@example.com'
    fill_in 'Password', with: 'banana'
    fill_in 'Password confirmation', with: 'banana'
    fill_in 'Username', with: 'username_1'
    attach_file 'Profile photo', "#{Rails.root}/spec/support/images/photo.jpeg"

    click_button 'Sign up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_content('Sign Out')

    visit edit_user_registration_path


    expect(page).to have_content('Edit Your Profile')
    expect(page).to have_content('Sign Out')

    fill_in 'Email', with: 'jane@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    attach_file 'Profile photo', "#{Rails.root}/spec/support/images/photo2.jpeg"


    click_button 'Update'
    expect(page).to have_content("Current password can't be blank")
    expect(page).to have_content('Edit Your Profile')

  end

end
