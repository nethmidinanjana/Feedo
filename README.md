# Feedo - Pet Feeding Controller App

**Feedo** is a mobile application built using **React Native** that allows users to control a pet feeding system. It connects to a pet feeder machine via an ESP32-based setup connected to Wi-Fi. The app provides an intuitive interface to remotely manage and schedule feeding times for your pets.

## Features

- **Real-Time Feeding Control**: Feed your pets remotely using the app.
- **User-Friendly Interface**: Simple and easy-to-navigate app design for users of all ages.
- **ESP32 Integration**: Communication between the app and the pet feeder system using ESP32 connected to Wi-Fi.
- **Scheduling**: Set up automatic feeding schedules to ensure your pets are fed on time.
  
## Tech Stack

- **Frontend**: React Native
- **Backend**: Java (for app communication and API)
- **Database**: MySQL (used for storing user data and feeding schedules)
- **Hardware**: ESP32, Arduino

## Setup

To run this project locally, follow these steps:

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/feedo.git
   ```
2. Install dependencies

```bash
npm install
```
3. Set up the backend (Java) and ensure the ESP32 is connected to your network.

4. Run the app in development mode

```bash
npx expo start
```
