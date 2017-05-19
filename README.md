# Tic Tac Toe Project

https://constaac.github.io/Tic_Tac_Toe/

This is a single-page-application that allows a user to sign up and login to play
tic-tac-toe against a friend. Games can be saved for later and reloaded. The user
can also view statistics about number of games played etc.

# Instructions

Alternate between players placing X's and O'x onto the gameboard until one player
places "three-in-a-row" (horizontally, diagonally, or vertically) and wins, or
spaces run out and the game results in a draw.

You must first create an account with your email address, before you can log in
and view the game board. Initially, you need to create a game to get started. A
new game will begin and the Game ID associated with that game will be displayed
on the page. You can leave the game without finishing the game, and its progress
will be saved with the server. To load a previous game, click the button to laod
your game history (can be display only finished or in-progress games) and enter
the Game ID of the game you wish to load into the prompt that pops up when you
click load game. At any point, you may view your career statistics via the button,
and a popup will appear displaying various stats associated with your account.

You may change your password with the change password button by entering your
old password followed by your new password. If you wish to sign in to a different
account, simply logout and sign in with the other account.

## Technologies Used

This project runs on a combination of Javascript, Ajax and Jquery (apart from the
CSS and HTML for the page itself). The game logic to determine the majority of
how the game functions is determined by an "engine" built in javascript. Jquery
helps display error messages and manipulate the DOM as the user interacts with
the website. Account info, game history, etc. is stored with a remote API, which
the game contacts using AJAX requests.

## Planning Stages

I began the project by sketching out a wire frame (linked at the bottom) that
made space for every feature and button I wanted to include. I had originally
planned to allow for multiplayer-online functionality, but quickly realized I
would have to severely cut back time I could spend on the UI / User Experience.
The structure of the page that I had envisioned during my wire frame sketching
morphed into what it resembles now after I learned about bootstrap.

I began the process by creating a general layout of divs, beginning from an HTML
boilerplate. I changed the background of each div to visualize what the structure
of the page would look like and make sure to have room for each feature I wanted
implement. Next, I began working out the logistics for the authentican processes
and verified that I could contact the API with curl scripts. I generally would
add an element to the page, add an "on" event, link it up to an AJAX call, test
that the call works, and then finally workout what would happen when the request
failed or succeeded. This meant I would use JQuery to either display an error
notification, or manipulate the DOM in accordance with the feature I am trying to
 implement. Next, I created the Javascript to handle the actual logic that
 controlled the game of Tic-Tac-Toe by checking for wins, calculating turns, etc.
 This was the most tedious part, as it required a lot of interaction with every
 other aspect of the website. Finally, I tidied the page up with CSS, and began
 checking for bugs, which I would address by fixing or implementing some sort of
 error notification.

In retrospect, if I had more time I would have organized my code much more
efficiently. My code contains a good amount of repetition and strangely named
variables/functions that I intend to prune in the future, but I was much more
concerned with producing a working product that producing unfinished, but
organized code - especially given the tight deadline.

## Plans for the Future

I would like to eventually add multiplayer-online functionality, which was my
original ambition. The website does not do well when the window size shrinks,
which is something I would also like to address. I envision being able to play
on a mobile device, so making the UI compatible with mobile devices is definitely
priority. In terms of my logic and code structure, I think I can clean up a lot
of redundancies and increase efficiency throughout if I sit down with the project
once more.

## User Stories

1. I would like to log in and play a game with my siblings. Ideally, I want to
play with them on our separate devices.

2. I would like to be able to play games with users on the network that I've
never met.

3. I just want a simple game that I can play with my grandparents on their new
computer. We just need to be able to play several games at a time - without
having to log back in or refresh the page.

4. I want to be able to play games while I'm at work. Ideally I can compare my
win statistics with my friends who also use the website frequently.

## Initial Wireframe Links

Main View - http://i.imgur.com/8X96esv.jpg
"Logged In" View - http://i.imgur.com/u1fn1gg.jpg
