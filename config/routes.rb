Rails.application.routes.draw do
  namespace :api do
    resources :coffee
  end 
end
