class DropCoffees < ActiveRecord::Migration[5.1]
  def change
    drop_table :coffees
  end
end
