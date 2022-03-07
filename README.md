# MUSIC MANIA

## Project Description

Music Mania is a full-stack web and mobile application that allows users to play, favorite, and buy music. Within each song detail, users can follow a link to the song's lyrics. Users can search through the provided music based on song title and artist. Users can also express their creativity by playing the piano on the mobile version of the application. Employees and administrators are able to add new employees, but only administrators can remove any user from the system. Employees and administrators are also able to remove songs that are listed in the application.

## Technologies Used

- React Native
- Expo
- API Gateway
- AWS Lambda
- Typescript
- AWS EC2
- NodeJS
- PostgreSQL
- DynamoDB

## Features

List of features ready and TODOs for future development

- As a user, I can view, play, favorite music and add songs to playlists
- As a user, I can search the music that is available
- As a user, I can play the piano _on mobile only_

To-do list:

- Implement a logical process of how accounts are removed by admin
- Provide mp3 files to play music
- Redeem extra credit that can be used to buy more music from how frequently a user interacts with the app
- Add screens to view favorited music and bought songs

## Getting Started

1. `git clone`
2. `npm install --save`
3. Configure AWS with access key and secret key
4. While in server folder `npm run setup` to create DynamoDB tables
   - If not in region `us-west-2` change region in `createTable.ts`
5. Setup your PostgreSQL database instance and use `song.sql` to populate the database.
6. Create AWS Lambda functions triggered by AWS API Gateway by using the Lambda functions in the `lambda` folder.
   _Note: PostgreSQL is for holding song data and DynamoDB is for user authentication_
7. Create .env using `example.env` in the server folder as a guide.
8. You can run the server locally by doing `npm start` in the server folder.
9. Once the server is running you can `npm start` in the client folder to start Expo.
   -When Expo starts in localhost:19002 choose how you want to build the project. i.e. web, Android, or iOS
10. Enjoy

## Usage

To use the app first register and log in:
![Login or Register](/Screenshots/login.png 'Login or Register')

You will be taken to the Home Screen:
![Home Screen](/Screenshots/home-screen.png 'Home Screen')

Any user can play songs:
![Playing Song](/Screenshots/playing.png 'Playing Song')

View the song details for further actions:
![Song Detail](/Screenshots/song-detail.png 'Song Detail')

Favorite a song:
![Favorite a song](/Screenshots/favorited.png 'Favorite a song')

Buy a song:
![Buy a song](/Screenshots/bought.png 'Buy a song')

Add a song to a playlist:
![Add to playlist](/Screenshots/add-to-playlist.png 'Add to playlist')

View all of your playlists:
![View all playlists for user](/Screenshots/playlists.png 'View all playlists for user')

View a specific playlist to play it:
![View specific playlist](/Screenshots/playlist-detail.png 'View specific playlist')

As management we can add and delete users:
![Manage users](/Screenshots/management.png 'Manage users')

When done logout:
![Logout](/Screenshots/logout.png 'Logout')

## Contributors

- Jamie Tater
- Yasmine Smith
- Tashika Williams
- Michael Woo
