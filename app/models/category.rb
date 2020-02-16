class Category < ActiveHash::Base
  include ActiveHash::Associations
  has_many :tasks

  field :name 
  self.data = [
    {id: 0, name: 'none'}, 
    {id: 1, name: 'work'}, 
    {id: 2, name: 'life'},
    {id: 3, name: 'hobby'}, 
    {id: 4, name: 'other'}
  ]
end
