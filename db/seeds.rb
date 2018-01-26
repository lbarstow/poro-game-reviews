if !Category.first
  Category.create!(name: "Abstract Strategy")
  Category.create!(name: "Card")
  Category.create!(name: "Cooperative")
  Category.create!(name: "Deck Builder")
  Category.create!(name: "Deduction")
  Category.create!(name: "Dice")
  Category.create!(name: "Euro")
  Category.create!(name: "Party")
  Category.create!(name: "Puzzle")
  Category.create!(name: "Role Playing")
  Category.create!(name: "Thematic")
  Category.create!(name: "Word")
end

if !User.first
  user = User.create!(email: Faker::Internet.email, password: 'jhkasdfhjkl', username: 'first_user', sign_in_count: 2)
end

if !Game.first
  10.times do
    game = Game.create!(name: Faker::Hipster.word.capitalize + ': the Game', user: user, min_player_count: Faker::Number.between(1, 2), max_player_count: Faker::Number.between(3,8), description: Faker::Hipster.sentences(4).join(' '))
    game_categories = []
    (rand(3) + 1).times do
      game_categories << Category.order("RANDOM()").first
    end
    game.categories = game_categories.uniq
  end
end

if !Review.first
  30.times do
    Review.create!(rating: Faker::Number.between(1,5), body: Faker::Hipster.sentences(3).join(' '), game: Game.order("RANDOM()").first, user: User.first, victory_points: Faker::Number.between(1,100))
  end
end
