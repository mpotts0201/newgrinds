# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180414225313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coffee_shops", force: :cascade do |t|
    t.string "name"
    t.string "hours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "api_id"
    t.string "address"
    t.string "description"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.integer "stars"
    t.bigint "user_id"
    t.bigint "coffee_shop_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coffee_shop_id"], name: "index_reviews_on_coffee_shop_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "aboutMe"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "reviews", "coffee_shops"
  add_foreign_key "reviews", "users"
end
