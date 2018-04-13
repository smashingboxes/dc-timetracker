Rails.application.routes.draw do
  root to: 'time_entries#index'

  ActiveAdmin.routes(self)

  resources :time_entries, only: %w(new create index update destroy)
  devise_for :users
end
