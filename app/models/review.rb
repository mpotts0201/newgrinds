class Review < ApplicationRecord
  belongs_to :user
  # , :foreign_key => :id, :primary_key => :id
  belongs_to :coffee_shop
  # , :foreign_key => :api_id, :primary_key => :api_id

  


end



