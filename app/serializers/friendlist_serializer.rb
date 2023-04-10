class FriendlistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friend_id, :first_name, :last_name, :email, :liked
end
