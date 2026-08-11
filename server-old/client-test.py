from urllib.request import urlopen

with urlopen('http://localhost:8000/signup') as response:
    for line in response:
        line = line.decode()
        print(line.rstrip())
