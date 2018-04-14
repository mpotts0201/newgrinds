class DeleteAddressFromCoffeeShops < ActiveRecord::Migration[5.1]
  def change
    remove_column :coffee_shops, :address
  end
end
