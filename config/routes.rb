Rails.application.routes.draw do
  root to: "application#root"

  mount_devise_token_auth_for "User", at: "api/v1/users"

  ActiveAdmin.routes(self)

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :timesheets, only: %i(index create show)
      resources :jobs, only: %i(index create show)
    end
  end
end
