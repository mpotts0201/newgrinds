Rails.application.routes.draw do

  post '/search', to: 'api/coffee_shops#search'

  namespace :api do
    resources :reviews
  end
  namespace :api do
    resources :users
  end

  namespace :api do 
    resources :coffee_shops
  end


end
