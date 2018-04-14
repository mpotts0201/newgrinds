class CreateReview2s < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :text
      t.integer :stars
      t.references :user, foreign_key: true
      t.references :coffee_shop, foreign_key: true

      t.timestamps
    end
  end
end
