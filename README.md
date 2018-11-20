# MusiClover

# Introduction
A simple music application to listen to music on your mobile device.
All music data is fetched from [nhaccuatui.com](nhaccuatui.com).

# Features
* Listen to music (of course)
* Top 100 songs in different genres
* Save songs to online personal account
* Download songs to your local device
* Create online or offline lists
* Background music listening
* ...

# Installation
Open another terminal window and navigate to project directory and run:
1. `npm install` to install all packages needed to run the app.
2. `react-native run-android` or `react-native run-ios` to run the application on your virtual device on your computer.

You can find more information about how to install and run react-native app on the offical react-native [website](https://facebook.github.io/react-native/).

# Main Technology
* [React-native](https://facebook.github.io/react-native/) to develop mobile apps by JavaScript. 
* [Fetch API](https://facebook.github.io/react-native/docs/network) provided by react-native to fetch song data from remote website.
* [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage) provided by react-native and [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) make perfect combination to save data to local storage.
* [React-native-firebase](https://github.com/invertase/react-native-firebase) to create online personal account with Firebase Authentication and also save data remotely with Clound Firestore.
* [React-native-video](https://github.com/react-native-community/react-native-video) offers a really nice component to play music or video on your device.
* [ReactNavigation](https://reactnavigation.org/docs/en/getting-started.html) to navigate between application screens.

# Credit 
This project was made possible thank to:
* https://facebook.github.io/react-native: React-native official website provides really nice tutorials on basic things about react-native).
* https://hackernoon.com/building-a-music-streaming-app-using-react-native-6d0878a13ba4: A small, simple tutorial on react-native-video.
* And various other sources ...
