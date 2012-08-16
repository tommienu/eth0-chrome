# Building a Chrome-plugin for http://eth0.se
Anyone can help out and everyone will be credited on this page for their work. Please submit a pull request and we'll include it as soon as we've verified it.

## API overview
### Create a New eth0.se

All requests must be made using HTTP GET. The href parameter should be URL-encoded.

  * http://eth0.se/new?href={href} - Create a new eth0.se and redirect to it (not useful, we know)
  * http://eth0.se/new.html?href={href} - Create a new eth0.se and show in HTML format
  * http://eth0.se/new.json?href={href} - Create a new eth0.se and show in JSON format
  * http://eth0.se/new.xml?href={href}    - Create a new eth0.se and show in XML format
  * http://eth0.se/new.txt?href={href}    - Create a new eth0.se and show in text format

### HTTP Status Codes
  * 200 - We created (or found, if it already exists) an eth0.se and will display in requested format
  * 302 - Used when redirecting to target HREF
  * 400 - There was a problem with the href parameter.

## Lookup an eth0.se

All requests must be made using HTTP GET. The code parameter is 1-6 character alpha-numeric.

  * http://eth0.se/{code}       - Redirect an eth0.se to its target HREF
  * http://eth0.se/{code}.html  - Display an eth0.se in HTML format
  * http://eth0.se/{code}.json  - Display an eth0.se in JSON format
  * http://eth0.se/{code}.xml   - Display an eth0.se in XML format
  * http://eth0.se/{code}.txt   - Display an eth0.se in text format

### HTTP Status Codes

  * 200 - We found the eth0.se and will display in requested format
  * 302 - Used when redirecting to target HREF
  * 404 - We couldn't find the requested eth0.se

## eth0.se Formats

eth0.se records can be displayed in HTML, JSON, XML and text formats.

Examples in JSON:

### JSON
  {"code":"1","href":"http://www.google.com/"}



#### Credits:
This page is more or less borrowed from, [https://github.com/ajstiles/urly/wiki](https://github.com/ajstiles/urly/wiki). Thanks! 