Rails.application.routes.draw do
  devise_for :users
  resources :tasks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "tasks#index"
  post '/tasks/:id/done' => 'tasks#done',   as: 'done'
  post '/tasks/:id/wip' => 'tasks#wip',   as: 'wip'
end
