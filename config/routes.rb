Rails.application.routes.draw do

  # get '/coffee_shops/:id' to: 'coffee_shops#show'

  namespace :api do
    resources :users
  end

  namespace :api do 
    resources :coffee_shops
  end


end
