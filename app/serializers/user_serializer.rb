class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest
  has_many :reviews
  has_many :user_games
  # has_one :friendList
end
