# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Review.destroy_all
User.destroy_all
CoffeeShop.destroy_all

murphy = User.create(name: "Murphy Potts", aboutMe: "I made this app!")
neil = User.create(name: "Neil Rajendran", aboutMe: "I enjoy a good cold brew, in the cold breeze.")
cameron = User.create(name: "Cameron Gunter", aboutMe: "Slam, Bam, call me Cam.")

zombie = CoffeeShop.create(name: "Zombie Coffee and Donuts", address: "350 Broad Street, Athens, GA", hours: "7:00 am - 10:00 pm Monday-Saturday, 8:00 am - 9:00 pm Sunday", api_id: "5744a7a7498ed43e52ca40a2", rating: 4)


review1 = Review.create(title: "My first review", text: "Testing out first review here.", user_id: murphy.id, coffee_shop_id: zombie.id, stars: 5)
review2 = Review.create(title: "Great coffee", text: "As long as there is cream and sugar.", user_id: cameron.id, coffee_shop_id: zombie.id, stars: 4)

# review1 = Review.create(title: "My first review", text: "Testing out first review here.")
# review2 = Review.create(title: "Great coffee", text: "As long as there is cream and sugar.")

puts "Save Successful"