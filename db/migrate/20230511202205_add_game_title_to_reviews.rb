class AddGameTitleToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :gameTitle, :string
  end
end
