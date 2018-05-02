class Api::V1::TimesheetsController < Api::V1::ApiController
  def index
    render_success_json(data: current_user.time_entry_sets)
  end

  def create
    timesheet = params[:id] ? Timesheet.find(params[:id]) : Timesheet.create(user: current_user)

    timesheet_params.each do |tes_params|
      tes = tes_params[:id] ? timesheet.time_entry_set.find(tes_params[:id]) : timesheet.time_entry_sets.new
      time_entries_params = tes_params.delete(:time_entries)
      tes.update(tes_params)
      time_entries_params.each do |te_params|
        te = te_params[:id] ? TimeEntry.find(te_params[:id]) : TimeEntry.new(time_entry_set: tes)
        te.update(date: te[:date], hours: te[:hours])
      end
    end
    render json: {
      time_entry_sets: current_user.time_entry_sets
    }
  end

  private

  def timesheet_params
    params.require(:time_entry_sets).map do |tes|
      tes.permit(:charge_code, :description, time_entries: %i(date hours))
    end
  end
end
