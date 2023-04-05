Rails.application.routes.draw do
  
  resources :user_games
  resources :reviews
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post "/signup", to: "users#create"
  post "/login", to: "session#create"
  get "/usersession", to: "session#show"
  delete "/logout", to: "session#destroy"
  post "/review", to: "reviews#create"
  get "/reviewsList", to: "reviews#index"
  post "/likeGame", to: "user_games#create"
  get "/usergames", to: "user_games#index"
  # post "/users", to: "users#create"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
