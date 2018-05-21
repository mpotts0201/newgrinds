class User < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :coffee_shops, :through => :reviews

    devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :omniauthable # delete :confirmable from this line!
    include DeviseTokenAuth::Concerns::User
end
