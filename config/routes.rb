Rails.application.routes.draw do
  root 'games#index'
  devise_for :users
  resources :games, only: [:index, :show, :create, :new]
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show] do
        resources :reviews, only: [:index]
        resources :categories, only: [:index]
      end
      resources :categories, only: [:index] do
        resources :games, only: [:index]
      end
      resources :games, only: [:create]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
