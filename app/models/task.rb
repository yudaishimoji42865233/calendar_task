class Task < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :category
  belongs_to :user

  validates :title, :start_date, :end_date, :category_id, :user_id, presence: true
end
