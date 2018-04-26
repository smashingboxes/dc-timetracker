Rails.application.routes.draw do
  root to: "application#root"

  ActiveAdmin.routes(self)
end
