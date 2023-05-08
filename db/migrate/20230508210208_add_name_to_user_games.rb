class AddNameToUserGames < ActiveRecord::Migration[6.1]
  def change
    add_column :user_games, :name, :string
  end
end
