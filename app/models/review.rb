class Review < ApplicationRecord
  belongs_to :user
  belongs_to :coffee_shop
end
