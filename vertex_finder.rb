require 'json'

file = File.read('./san-francisco_california_roads.geojson')
roads = JSON.parse(file)['features']

points = {}

roads.each do |road|
  road['geometry']['coordinates'].each do |coord|
    if points[coord.to_s]
      points[coord.to_s] += 1
    else
      points[coord.to_s] = 1
    end
  end
end

puts "raw points counted, writing to file now"

File.open("points.txt", 'w') do |f|
  f.write(points)
end

intersections_hash = points.select { |_, val| val > 1 }

puts "intersections found, writing to file now"

File.open("intersections_hash.txt", 'w') do |f|
  f.write(intersections_hash)
end

intersections_str = intersections_hash.keys

puts "intersections turned from hash to array of strings, writing to file now"

File.open("intersections_text.txt", 'w') do |f|
  f.write(intersections_str)
end

intersections_array_points = intersections_str.map { |inter| eval(inter) }

puts "intersections turned to raw array points, writing to file now"

File.open("intersections_array_points.txt", 'w') do |f|
  f.write(intersections_array_points)
end
