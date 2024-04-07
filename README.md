
# Getting Started
## redis 
### To run locally
install redis, add path to environment variables and run the command `redis-server` in command prompt
this will start your redis server locally
### now clone the git repo use command
### `git clone https://github.com/Prateek-singh-06/Exploding-Kitten.git`
now open the root directory and run command `cd backend`
this will take you to backend server directory

## go server
### to run locally
after cloning make a file `.env` backend directory
now copy the below text and paste it in .env file

`SERVER_URL=localhost:6379`

`PASSWORD=`

now run the command `go mod download`

This will download all its dependencies

run the command `go run main.go`

this will start your backend server locally

## frontend
open the root directory again and run command `cd frontend`
this will take you to frontend directory
make a file `.env` in frontend directory
now copy the below text and paste it in .env file

`REACT_APP_URL=ws://localhost:8080`


run `npm install`

This will install all the dependencies for the app.

Then run `npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

## Game Rules
### If the card drawn from deck is a cat card then the card is removed from deck.
### If the card is exploding kitten (bomb) then the player loses the game.
### If the card is defuse card then the card is removed from the deck. Also that card can be used to defuse one bomb that may come in subsequent cards drawn from deck.
### If the card is shuffle card then the game is restarted and the deck is filled with 5 cards again.

