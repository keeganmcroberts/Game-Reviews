class UserSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers

  attributes :id, :first_name, :last_name, :email, :password_digest, :avatar
  has_many :reviews
  has_many :user_games
  has_many :friendlist

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end
