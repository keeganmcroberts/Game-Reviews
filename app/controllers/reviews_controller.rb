class ReviewsController < ApplicationController
    def create
        review = Review.create(strong_params)
        if review.valid?
            render json: review, status: :ok
        else
            render json: review.errors.full_messages, status: :unprocessable_entity
        end

    end

    def destroy
        review = Review.find_by!(id: params[:id])
        if review
            review.destroy 
            head :no_content
        else
            item_not_found
        end
    end

    def index
        render json: Review.all
    end

    private 

    def strong_params
        params.permit(:user_id, :graphics, :gameplay, :difficulty, :comment, :slug, :score, :gameTitle)
    end
end
