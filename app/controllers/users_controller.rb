class UsersController < ApplicationController

    def index
        render json: User.all
    end

    def create
        user = User.create(strong_params)
        if user.valid?
            session[:user_id] = user.id 
            render json: user, status: :ok
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end

    end

    def update
        
    end

    private 

    def strong_params
        params.permit(:first_name, :last_name, :email, :password)
    end
end
