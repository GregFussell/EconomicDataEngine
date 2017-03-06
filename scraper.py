import urllib2
from bs4 import BeautifulSoup

def makesoup(url):
	req = urllib2.Request(url)
	page = urllib2.urlopen(req)
	soupdata = BeautifulSoup(page, "html.parser")
	return soupdata

# soup = makesoup("http://www.usboundary.com/Areas/Public%20Use%20Microdata%20Area/Florida")

# for ulitem in soup.find_all('ul', {'class':'areas'}):
# 	for liitem in ulitem.find_all('li'):
# 		print(liitem.text)

soup = makesoup("http://www.usboundary.com/Areas/Public%20Use%20Microdata%20Area/Florida/Alachua%20County%20%28Central%29--Gainesville%20City%20%28Central%29%20PUMA/192542")

communityID = soup.find_all('td')[1]
name = soup.find_all('td')[3]
belongsTo = soup.find_all('td')[5]

result = [communityID.text, name.text, belongsTo.text]
print(result)