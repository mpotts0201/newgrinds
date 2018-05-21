Rails.application.routes.draw do

  patch '/locate', to: 'api/coffee_shops#locate'

  post '/search', to: 'api/coffee_shops#search'

  post '/nav', to: 'api/coffee_shops#show'

  mount_devise_token_auth_for 'User', at: 'auth'


  namespace :api do
    resources :coffee_shops do 
      resources :reviews
    end 
  end



end
