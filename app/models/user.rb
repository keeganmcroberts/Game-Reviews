class User < ApplicationRecord
    has_secure_password

    has_many :reviews 
    has_many :user_games
    has_many :friendlist


    

    
end
