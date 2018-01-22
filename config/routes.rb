Rails.application.routes.draw do
  root 'games#index'
  devise_for :users
  resources :games, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
