# Sleep Scheduler [![Build Status](https://travis-ci.org/ucsb-cs48-w19/4pm-sleep-scheduler.svg?branch=master)](https://travis-ci.org/ucsb-cs48-w19/4pm-sleep-scheduler)

## Project summary

### One-sentence description of the project

A personalized way to calculate your sleep schedule.

### Additional information about the project

Sleep Scheduler is an iOS app created using React Native that calculates the optimal sleep schedule based on user input, and offer small rewards based on how well its schedule is followed. 

## Installation

### Prerequisites

NodeJS (6.7.0+)

Install NodeJS  https://nodejs.org/en/download/

Expo for iOS

Install on iOS Device: https://itunes.apple.com/us/app/expo-client/id982107779?mt=8

Note: For the app to run properly, it must be run on an iPhone due to it using iOS-dependent features.

### Installation Steps

For Developers:

* Clone the github repository into an empty folder
* Navigate into the 4pm-sleep-scheduler folder
* Run the command npm install, then npm start

Then, with iPhone that has expo installed as an app, go to your camera app and scan the QR code. This will prompt you to open expo and the app should be running there.

Note: In order for the app to run properly, you MUST be on the same wifi as the computer with the QR code.



## Functionality

When entering the app, choose whether you would like to receive an output based on a sleep cycle, or would rather have a strict number of hours for the application to go by.

Enter in a time that you want to wake up the next day, and our app will return the time you should go to sleep the night before so you can get the optimal number of hours of sleep.

Pressing the button will set an alarm, as well as a pop-up that informs you to which time the alarm is set.  Once that time is reached, a pop-up alert will show up in the app to inform you that it is time to go to sleep.


## Known Problems

- Currently has debugging text on the left side (True or false flags)
- Alarm changes as you scroll through the time picker wheel.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

