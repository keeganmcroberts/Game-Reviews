class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :graphics, :gameplay, :difficulty, :comment, :slug, :score
end
