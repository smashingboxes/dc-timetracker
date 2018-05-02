class Api::V1::TimesheetsController < Api::V1::ApiController
  def index
    render_success_json(data: current_user.time_entry_sets)
  end

  def create
    time_entry_set_params.each do |tes_params|
      # TODO: Support :id on frontend
      tes = tes_params[:id] ? TimeEntrySet.find(tes_params[:id]) : TimeEntrySet.new(user: current_user)
      # TODO: Change this from :hours to :time_entries after FE change
      time_entries_params = tes_params.delete(:hours)
      tes.update(tes_params)
      time_entries_params.each do |te_params|
        te = te_params[:id] ? TimeEntry.find(te_params[:id]) : TimeEntry.new(time_entry_set: tes)
        # TODO: Change this from :hours_worked to :hours after FE change
        te.update(date: te[:date], hours: te[:hours_worked])
      end
    end
  end

  private

  def time_entry_set_params
    params.require(:time_entry_sets).map do |tes|
      tes.permit(:charge_code, :description, hours: %i(date hours_worked))
    end
  end
end
