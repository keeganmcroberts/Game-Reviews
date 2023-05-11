Rails.application.routes.draw do
  resources :friendlists
  resources :user_games
  resources :reviews
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post "/signup", to: "users#create"
  get "/allUsers", to: "users#index"
  get "allFriends", to: "friendlists#index"
  post "/addFriend", to: "friendlists#create"
  delete "/removeFriend/:id", to: "friendlists#destroy"
  post "/login", to: "session#create"
  get "/usersession", to: "session#show"
  delete "/logout", to: "session#destroy"
  post "/review", to: "reviews#create"
  delete '/deleteReview/:id', to: "reviews#destroy"
  get "/reviewsList", to: "reviews#index"
  post "/likeGame", to: "user_games#create"
  delete "/removeGame/:id", to: "user_games#destroy"
  get "/usergames", to: "user_games#index"
  # post "/users", to: "users#create"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
