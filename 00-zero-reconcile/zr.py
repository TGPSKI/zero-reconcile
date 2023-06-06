expected = {
	"key": "00000000"
}

current = expected

def main():
	print('Starting...')
	print('Key: ' + current.get('key'))

# generate binary
def generate_binary(len):
	binary = ""
	for _ in range(len):
		binary += str(random.randint(0,1))
	return binary

if __name__ == '__main__':
	main()