import urllib2
from bs4 import BeautifulSoup

def makesoup(url):
	req = urllib2.Request(url)
	page = urllib2.urlopen(req)
	soupdata = BeautifulSoup(page, "html.parser")
	return soupdata

soup = makesoup("http://www.usboundary.com/Areas/Public%20Use%20Microdata%20Area/Florida")

for list1 in soup.find('ul', {"class":"areas"}):
	for item in soup.find_all('li'):
		print(item.text);
