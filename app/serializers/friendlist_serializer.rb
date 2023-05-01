class FriendlistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friend_id, :first_name, :last_name, :email, :liked

  # def friend_review
  #   self.object.friend_id.map do |each_friend|
  #     {"friend_reviews": each_friend.reviews}
  #   end
  # end
end
