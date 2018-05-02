class Api::V1::TimesheetsController < Api::V1::ApiController
  def index
    render_success_json(data: current_user.timesheets)
  end

  def create
    timesheet = params[:id] ? Timesheet.find(params[:id]) : Timesheet.create(period_start: timesheet_params[:period_start], user: current_user)

    timesheet_params[:time_entry_sets].each do |tes_params|
      tes = tes_params[:id] ? timesheet.time_entry_set.find(tes_params[:id]) : timesheet.time_entry_sets.new
      time_entries_params = tes_params.delete(:time_entries)
      tes.update(tes_params)
      time_entries_params.each do |te_params|
        te = te_params[:id] ? TimeEntry.find(te_params[:id]) : TimeEntry.new(time_entry_set: tes)
        te.update(date: te_params[:date], hours: te_params[:hours])
      end
    end
    render_success_json(data: timesheet)
  end

  private

  def timesheet_params
    params.permit(
      :period_start,
      time_entry_sets: [
        :id,
        :charge_code,
        :description,
        time_entries: %i(id date hours)
      ]
    )
  end
end
