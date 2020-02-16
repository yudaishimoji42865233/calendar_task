class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy, :done, :wip]

  def index
    @tasks = Task.where(user_id: current_user.id).includes(:user) if user_signed_in?
  end

  def show
  end

  def new
    if user_signed_in?
      @task = Task.new
    else
      redirect_to tasks_path
    end
  end

  def edit
  end

  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def done
    @task.update(status: "Done")
    @tasks = Task.all.includes(:user)
  end

  def wip
    @task.update(status: "WIP")
    @tasks = Task.all.includes(:user)
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :content, :start_date, :end_date, :category_id, :status).merge(user_id: current_user.id)
  end
end
