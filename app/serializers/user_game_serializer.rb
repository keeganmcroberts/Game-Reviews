class UserGameSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :slug, :liked
end
