# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
CoffeeShop.destroy_all

murphy = User.create(name: "Murphy Potts", aboutMe: "I made this app!")
neil = User.create(name: "Neil Rajendran", aboutMe: "I enjoy a good cold brew, in the cold breeze.")
cameron = User.create(name: "Cameron Gunter", aboutMe: "Slam, Bam, call me Cam.")

zombie = CoffeeShop.create(name: "Zombie Coffee and Donuts", address: "350 Broad Street, Athens, GA", hours: "7:00 am - 10:00 pm Monday-Saturday, 8:00 am - 9:00 pm Sunday")