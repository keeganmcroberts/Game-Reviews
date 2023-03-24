class SessionController < ApplicationController

    def create

        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
        # compares user logging-in email and password and finds/authenticates user info in the database
        
        session[:user_id] = user.id
        render json: user, status: :ok

        else
        render json: "Invalid Credentials", status: :unauthorized

        end
        
    end


    def show
        if current_user
            render json: current_user, status: :ok
        else
            render json: "Not autheticated", status: :unauthorized
        end
    end


    def destroy
        session.delete(:user_id)
    
        render json: {logged: "logged"}
      end



    private

    def current_user
        User.find_by_id(session[:user_id])
      end



end
