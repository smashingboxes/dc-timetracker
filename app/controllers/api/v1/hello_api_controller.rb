class Api::V1::HelloApiController < Api::V1::ApiController
  def index
    render json: { hello: "world" }
  end
end
