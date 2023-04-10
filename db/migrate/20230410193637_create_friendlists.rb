class CreateFriendlists < ActiveRecord::Migration[6.1]
  def change
    create_table :friendlists do |t|
      t.integer :user_id
      t.integer :friend_id
      t.string :first_name
      t.string :last_name
      t.string :email
      t.boolean :liked

      t.timestamps
    end
  end
end
