class AddRatingToCoffeeShops < ActiveRecord::Migration[5.1]
  def change
    add_column :coffee_shops, :rating, :integer
  end
end
