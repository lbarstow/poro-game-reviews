Rails.application.routes.draw do
  root 'games#index'
  devise_for :users
  resources :games, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
