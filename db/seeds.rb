#  This file should contain all the record creation needed to seed the database with its default
#  values.
#  The data can then be loaded with the rails db:seed command (or created alongside the database
#  with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

%i(employee supervisor administrator).each do |role_name|
  Role.create(name: role_name)
end

employee = User.create(
  email: "employee@example.com",
  password: "password",
  password_confirmation: "password"
)
employee.add_role(:employee)

supervisor = User.create(
  email: "supervisor@example.com",
  password: "password",
  password_confirmation: "password"
)
supervisor.add_role(:supervisor)

administrator = User.create(
  email: "administrator@example.com",
  password: "password",
  password_confirmation: "password"
)
administrator.add_role(:administrator)
