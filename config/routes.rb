Rails.application.routes.draw do
  namespace :api do
    get 'users/index'
  end

  namespace :api do
    get 'users/show'
  end

  namespace :api do
    get 'users/create'
  end

  namespace :api do
    get 'users/delete'
  end

  namespace :api do
    get 'users/update'
  end

  namespace :api do
    resources :coffee
  end 
end
