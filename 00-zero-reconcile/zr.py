import threading # needed for threading
import time # used to wait
import curses # used for displaying log on one portion of screen, prompt on other

expected = {
	"key": "00000000"
}

current = expected.copy()

def main(stdscr):
	while true:
		print('Starting...')
		print('Key: ' + current.get('key'))
		userin = input('> ')
		# user input can be used to generate binary to replace state key

def wellness(stdscr):
	while true:
		print('Checking state wellness...')
		if current.get('key') == "00000000":
			print('Checks clear')
		else:
			print('current.foo.bar state changed blah blah') # diff check dynamically
			# correct state
		time.sleep(5)

# generate binary
def generate_binary(len):
	binary = ""
	for _ in range(len):
		binary += str(random.randint(0,1))
	return binary

if __name__ == '__main__':
	#main(stdscr)