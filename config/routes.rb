Rails.application.routes.draw do
  root to: "application#root"

  mount_devise_token_auth_for "User", at: "api/v1/users"

  ActiveAdmin.routes(self)

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "/hello-world", to: "hello_api#index"
    end
  end
end
