class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end       コメントアウトする

  def create
    # Post.create(content: params[:content])
    post = Post.create(content: params[:content])
    #redirect_to action: :index
    render json:{ post: post }#postというキー
  end
end
