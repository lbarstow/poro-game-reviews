if !User.first
  User.create!(email: Faker::Internet.email, password: 'jhkasdfhjkl', sign_in_count: 2)
end

if !Game.first
  10.times do
    Game.create!(name: Faker::Hipster.word.capitalize + ': the Game', min_player_count: Faker::Number.between(1, 2), max_player_count: Faker::Number.between(3,8), description: Faker::Hipster.sentences(4).join(' '))
  end
end

if !Review.first
  30.times do
    Review.create!(rating: Faker::Number.between(1,5), body: Faker::Hipster.sentences(3).join(' '), game_id: Faker::Number.between(1,10), user_id: 1, victory_points: Faker::Number.between(1,100))
  end
end
