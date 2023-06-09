class FriendlistsController < ApplicationController

    def index 
        render json: Friendlist.all
    end


    def create
        new_friend = Friendlist.create(strong_params)

        if new_friend.save
            render json: new_friend
        else
            render json: {error:new_friend.errors.full_messages}
        end
    end

    def destroy
            friend_unfollowed = Friendlist.find_by!(friend_id: params[:id])
            if friend_unfollowed
                friend_unfollowed.destroy
                
                head :no_content
            else
                item_not_found
            end
        
    end

    private

    def strong_params
        params.permit(:user_id, :friend_id, :first_name, :last_name, :email, :liked, :reviews)
    end
end
