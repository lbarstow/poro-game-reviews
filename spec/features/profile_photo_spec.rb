require "rails_helper"

feature "profile photo" do
  scenario "user uploads a profile photo" do
    visit root_path
    click_link "Sign Up"

    fill_in "Username", with: "Poro King"                                                                                                                                 
    fill_in "Email", with: "ash@s-mart.com"
    fill_in "Password", with: "boomstick!3vilisd3ad"
    fill_in "Password confirmation", with: "boomstick!3vilisd3ad"
    attach_file 'Profile photo', "#{Rails.root}/spec/support/images/photo.jpeg"
    click_button "Sign up"

    expect(page).to have_content("Welcome! You have signed up successfully.")
    expect(page).to have_css("img[src*='photo.jpeg']")
  end
end
