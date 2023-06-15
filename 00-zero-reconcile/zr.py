import time # used to wait

expected = {
	"key": "00000000"
}

current = expected.copy()

def main():
	counter = 0
	print('Key set: ' + current.get('key'))
	while True:
		wellness()
		time.sleep(3)
		wellness()
		time.sleep(3)
		counter += 1
		if counter == 3:
			current['key'] = '11111111'
			counter = 0

def wellness():
	print('Checking state wellness...')
	if current == expected:
		print('-> Checks clean')
	else:
		dc = diffCheck().copy()
		print('-> State changed')
		for key, (v1, v2) in dc.items():
			print(f'   {key}: {v1} != {v2}')
		reconcile()

def diffCheck():
	diffPairs = {}
	for key in current:
		if key in expected and current[key] != expected[key]:
			diffPairs[key] = (current[key], expected[key])
	return diffPairs

def reconcile():
	print('Resetting state...')
	time.sleep(1)
	current['key'] = '00000000'
	print('-> State reset')

if __name__ == '__main__':
	main()