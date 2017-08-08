class CreateRoadEdgesTable < ActiveRecord::Migration
  def change
    create_table :road_edges_tables do |t|
      t.string :street_name
      t.float :length
      
    end
  end
end
