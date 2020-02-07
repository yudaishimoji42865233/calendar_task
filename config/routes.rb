Rails.application.routes.draw do
  devise_for :users
  resources :tasks
  root to: "tasks#index"
  post '/tasks/:id/done' => 'tasks#done',   as: 'done'
  post '/tasks/:id/wip' => 'tasks#wip',   as: 'wip'
end
