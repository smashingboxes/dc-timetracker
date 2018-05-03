class Api::V1::JobsController < Api::V1::ApiController
  def create
    c = ChargeCode.new(charge_code_params)
    render_save(c)
  end

  private

  def charge_code_params
    params.permit(:code, :name)
  end
end
