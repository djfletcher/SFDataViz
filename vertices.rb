require 'json'

file = File.read('./san-francisco_california_roads.geojson')
roads = JSON.parse(file)['features']

intersections = []

roads.each_with_index do |road1, idx1|
  roads.each_with_index do |road2, idx2|
    next if idx1 == idx2
    road1['geometry']['coordinates'].each do |coord1|
      road2['geometry']['coordinates'].each do |coord2|
        intersections << coord1 if coord1 == coord2
      end
    end
  end
end

intersections = intersections.uniq

File.open("out.txt", 'w') do |f|
  f.write(intersections)
end
