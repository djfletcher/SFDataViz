require 'json'

file = File.read('/Volumes/DATA/Daniel/Desktop/san-francisco_california.imposm-geojson/san-francisco_california_roads.geojson')
roads = JSON.parse(file)['features']

total = 0
roads.each { |r| total += r['geometry']['coordinates'].length }

puts total
