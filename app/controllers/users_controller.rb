class UsersController < ApplicationController

    def create
        user = User.create(strong_params)
        if user.valid?
            session[:user_id] = user.id 
            render json: user, status: :ok
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end

    end

    private 

    def strong_params
        params.permit(:first_name, :last_name, :email, :password)
    end
end
