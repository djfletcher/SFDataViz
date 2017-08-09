require 'json'

file = File.read('/Volumes/DATA/Daniel/Desktop/intersections_array_points.txt')

points = eval(file)

File.open("shorted_intersections.js", 'w') do |f|
  f.write('const points = ')
  f.write(points[0..500])
end
