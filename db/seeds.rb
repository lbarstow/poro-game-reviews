if !Game.first
  10.times do
    Game.create(name: Faker::Hipster.word.capitalize + ': the Game', min_player_count: Faker::Number.between(1, 2), max_player_count: Faker::Number.between(3,8), description: Faker::Hipster.sentences(4).join(' '))
  end
end
