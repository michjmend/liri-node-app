# liri-node-app
Language Interpretation and Recognition Interface
**LIRI is similar to SIRI**

liri-node-app is a command line nodejs application that uses 3 different API's to output information about concerts, music on spotify, and movie info from OMDB.

Liri.js can take in the following commands:
1. node liri.js concert-this <artist/band name here>
  ![GitHub Logo](./images/Screen Shot 2019-04-27 at 8.01.39 PM.png)
2. node liri.js spotify-this-song '<song name here>'
3. node liri.js movie-this '<movie name here>'
4. node liri.js do-what-it-says
   1. Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
   2. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

By: Michelle Mendieta
