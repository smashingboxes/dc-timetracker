# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180503163228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "charge_codes", force: :cascade do |t|
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "time_entries", force: :cascade do |t|
    t.datetime "date"
    t.float "hours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "time_entry_set_id"
    t.index ["time_entry_set_id"], name: "index_time_entries_on_time_entry_set_id"
  end

  create_table "time_entry_sets", force: :cascade do |t|
    t.text "description"
    t.string "charge_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "timesheet_id"
    t.index ["timesheet_id"], name: "index_time_entry_sets_on_timesheet_id"
  end

  create_table "timesheets", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "period_start"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_timesheets_on_user_id"
  end

  create_table "user_charge_codes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "charge_code_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["charge_code_id"], name: "index_user_charge_codes_on_charge_code_id"
    t.index ["user_id"], name: "index_user_charge_codes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider", default: "email", null: false
    t.string "uid", null: false
    t.json "tokens"
    t.boolean "active"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "time_entries", "time_entry_sets"
  add_foreign_key "timesheets", "users"
  add_foreign_key "user_charge_codes", "charge_codes"
  add_foreign_key "user_charge_codes", "users"
end
