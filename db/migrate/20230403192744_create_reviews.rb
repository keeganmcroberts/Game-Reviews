class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :graphics
      t.integer :gameplay
      t.integer :difficulty
      t.string :comment
      t.string :slug

      t.timestamps
    end
  end
end
