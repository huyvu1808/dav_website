require './input_functions'

# Complete the code below
# Use input_functions to read the data from the user
class Race
     attr_accessor :description, :id, :time, :location
end
def read_a_race()
    race = Race.new(description,id,time,location)
    description = read_string("Enter race description:")
	id = read_integer("Enter id:")
	time = read_string("Enter time:")
	location = read_string("Enter location:")
end

def read_races()
   count = read_integer("How many races are you entering:")
   races = Array.new()
   index = 0
   while (index < count)
        races << read_a_race
		index += 1
   end
   return races
end

def print_a_race(a_race)
    puts("Race description " + a_race.description.to_s)
	puts("Id " + a_race.id.to_s)
	puts("Time " + a_race.time.to_s)
	puts("Location " + a_race.location.to_s)
end

def print_races(races)
    index = 0
	while (index < races.length)
	print_a_race(races[index])
	index += 1
	end
end

def main()
	races = read_races()
	print_races(races)
end

main()