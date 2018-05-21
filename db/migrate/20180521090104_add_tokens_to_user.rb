class AddTokensToUser < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      ## Database authenticatable
      t.json :tokens#,              null: false, default: ""


    end
  end
end
