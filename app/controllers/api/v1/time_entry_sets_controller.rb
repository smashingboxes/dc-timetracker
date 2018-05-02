class Api::V1::TimeEntrySetsController < Api::V1::ApiController
  def index
    render_success_json(data: current_user.time_entry_sets)
  end
end
