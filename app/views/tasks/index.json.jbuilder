json.array!(@tasks) do |task|
  json.title task.title
  json.start task.start_date
  json.end task.end_date
  json.url task_url(task)
end