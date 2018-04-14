class AddDescriptionToCoffeeShops < ActiveRecord::Migration[5.1]
  def change
    add_column :coffee_shops, :description, :string
  end
end
