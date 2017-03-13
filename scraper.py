import urllib2 #for web scraping
from bs4 import BeautifulSoup 
from xlwt import * #for python -> excel

def makesoup(url):
	req = urllib2.Request(url)
	page = urllib2.urlopen(req)
	soupdata = BeautifulSoup(page, "html.parser")
	return soupdata

w = Workbook()
ws = w.add_sheet('Florida')
rowcount = 0
colcount = 0

for num in range(1, 4):
	soup1 = makesoup("http://www.usboundary.com/Areas/Public%20Use%20Microdata%20Area/Florida/" + str(num))
#soup1 = makesoup("http://www.usboundary.com/Areas/Public%20Use%20Microdata%20Area/Washington")
	for ulitem in soup1.find_all('ul', {'class':'areas'}):
		for a in ulitem.find_all('a'):
			if(a.text == "Miami-Dade (South/Outside Urban Development Boundary) & Monroe Counties PUMA"):
				i = 0
			else: 
				link = a['href']
				soup2 = makesoup("http://www.usboundary.com/Areas/Public%20Use%20Microdata%20Area/Florida/" + link[42:]) #link is 33 + number of characters of state
				communityID = soup2.find_all('td')[1]
				name = soup2.find_all('td')[3]

				print(communityID.text + " " + name.text)
				ws.write(rowcount, colcount, communityID.text)
				ws.write(rowcount, colcount + 1, name.text)
				rowcount = rowcount + 1

w.save('florida.xls')
