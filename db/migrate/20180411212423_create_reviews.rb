class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :text
      t.references :users, foreign_key: true
      t.references :coffee_shops, foreign_key: true

      t.timestamps
    end
  end
end
