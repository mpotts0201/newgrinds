class AddLocationToCoffeeShops < ActiveRecord::Migration[5.1]
  def change
    add_column :coffee_shops, :address, :string
  end
end
