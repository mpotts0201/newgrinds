Rails.application.routes.draw do

  patch '/locate', to: 'api/coffee_shops#locate'

  post '/search', to: 'api/coffee_shops#search'

  post '/nav', to: 'api/coffee_shops#show'

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
