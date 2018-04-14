class DropReviewsTable < ActiveRecord::Migration[5.1]
  def up
    drop_table :reviews

  end
end
