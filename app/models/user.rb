class User < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :coffee_shops, :through => :reviews
end
