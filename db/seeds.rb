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

if !Game.first
  10.times do
    game = Game.create!(name: Faker::Hipster.word.capitalize + ': the Game', min_player_count: Faker::Number.between(1, 2), max_player_count: Faker::Number.between(3,8), description: Faker::Hipster.sentences(4).join(' '))
    (rand(3) + 1).times do
      game.categories << Category.order("RANDOM()").first
    end
  end
end
