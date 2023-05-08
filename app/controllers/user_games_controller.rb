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

    def destroy
        user_game = UserGame.find_by!(id: params[:id])
        if user_game
            user_game.destroy 
            head :no_content
        else
            item_not_found
        end
    end


#     def destroy
#         friend_unfollowed = Friendlist.find_by!(friend_id: params[:id])
#         if friend_unfollowed
#             friend_unfollowed.destroy  
            
#             head :no_content
#         else
#             item_not_found
#         end
# end


    private

    def strong_params
        params.permit(:user_id, :slug, :liked)
    end
end
