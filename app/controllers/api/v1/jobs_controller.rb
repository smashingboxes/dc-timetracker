class Api::V1::JobsController < Api::V1::ApiController
  def create
    c = ChargeCode.new(charge_code_params)
    render_save(c)
  end

  def index
    render_success_json(data: ChargeCode.all)
  end

  private

  def charge_code_params
    params.permit(:code, :name)
  end
end
