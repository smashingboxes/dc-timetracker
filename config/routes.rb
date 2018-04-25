Rails.application.routes.draw do
  root to: "hello_world#index"
  ActiveAdmin.routes(self)
end
