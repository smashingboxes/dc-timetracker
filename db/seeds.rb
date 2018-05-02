#  This file should contain all the record creation needed to seed the database with its default
#  values.
#  The data can then be loaded with the rails db:seed command (or created alongside the database
#  with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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

reporter = User.create(
  email: "reporter@example.com",
  password: "password",
  password_confirmation: "password"
)
reporter.add_role(:reporter)

administrator = User.create(
  email: "administrator@example.com",
  password: "password",
  password_confirmation: "password"
)
administrator.add_role(:administrator)
