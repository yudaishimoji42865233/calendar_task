class ChangeDatatypeColmunOfTasks < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :title, :string, null: false
    change_column :tasks, :content, :text, null: false
    change_column :tasks, :start_date, :datetime, null: false
    change_column :tasks, :end_date, :datetime, null: false
    change_column :tasks, :status, :string, null: false
    change_column :tasks, :user_id, :integer, null: false
  end
end
