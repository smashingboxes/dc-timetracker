ActiveAdmin.register User do
  actions :all, except: %i(destroy)
  permit_params :email, :active, :password, :password_confirmation, role_ids: []

  index do
    column :email
    actions
  end

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :roles, as: :check_boxes
      f.input :active
    end

    actions
  end

  show do
    attributes_table do
      row :email
      row :roles do
        user.roles.map(&:name).join(", ")
      end
      row :current_sign_in_at
      row :last_sign_in_at
      row :current_sign_in_ip
      row :last_sign_in_ip
      row :created_at
      row :updated_at
      row :active
    end
  end

  controller do
    def update
      model = :user

      if params[model][:password].blank?
        %w(password password_confirmation).each { |p| params[model].delete(p) }
      end

      super
    end
  end
end
