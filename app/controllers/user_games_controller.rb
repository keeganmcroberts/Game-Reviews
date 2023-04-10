class UserGamesController < ApplicationController


    def index
        render json: UserGame.all
    end
   

    def create 
        
        new_user_game = UserGame.new(strong_params)
        
        if new_user_game.save
            render json: new_user_game
        else
            render json: {error:new_user_game.errors.full_messages}
        end

    end


    private

    def strong_params
        params.permit(:user_id, :slug, :liked)
    end
end