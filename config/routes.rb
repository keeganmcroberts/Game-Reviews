Rails.application.routes.draw do
  
  resources :reviews
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post "/signup", to: "users#create"
  post "/login", to: "session#create"
  get "/usersession", to: "session#show"
  delete "/logout", to: "session#destroy"
  # post "/users", to: "users#create"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
