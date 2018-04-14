class AddApiIdToCoffeeShops < ActiveRecord::Migration[5.1]
  def change
    add_column :coffee_shops, :api_id, :string
  end
end
