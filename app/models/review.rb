class Review < ApplicationRecord
  belongs_to :users
  belongs_to :coffee_shops
end
