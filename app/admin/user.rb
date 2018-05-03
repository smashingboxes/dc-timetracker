ActiveAdmin.register User do
  actions :all
  permit_params :email, :password, :password_confirmation, :roles

  index do
    id_column
    column :email
    actions
  end

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :roles, as: :check_boxes, collection: User::ROLES
    end

    actions
  end
end
