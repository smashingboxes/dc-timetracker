class TimeEntriesController < ApplicationController
  before_action :set_time_entry, only: %i(update destroy)

  def create
    @time_entry = current_user.time_entries.create(time_entry_params)
    redirect_to time_entries_path
  end

  def update
    @time_entry.update(time_entry_params)
    redirect_to time_entries_path
  end

  def index
    @time_entries = current_user.time_entries.all
  end

  def destroy
    @time_entry.destroy
    redirect_to time_entries_path
  end

  private

  def set_time_entry
    @time_entry = TimeEntry.find(params[:id])
  end

  def time_entry_params
    params.require(:time_entry).permit(:start_time, :end_time, :description)
  end
end
