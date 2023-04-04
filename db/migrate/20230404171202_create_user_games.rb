class CreateUserGames < ActiveRecord::Migration[6.1]
  def change
    create_table :user_games do |t|
      t.integer :user_id
      t.string :slug
      t.boolean :liked

      t.timestamps
    end
  end
end
