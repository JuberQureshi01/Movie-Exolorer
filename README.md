Movie Explorer App

A responsive web app for browsing, searching, and favoriting movies, built with React, Vite, ShadCN UI, and the TMDB API. This project fulfills all requirements for the "Movie Explorer App" assignment.

Features

Browse Movies: Discover movies by "Popular," "Top Rated," "Upcoming," or "Now Playing" using a clean dropdown filter.

Infinite Scroll: Seamlessly load more movies as you scroll on the Home and People pages.

Movie Details: View comprehensive details for any movie, including its poster, rating, runtime, overview, and genres.

Trailer Modal: Watch movie trailers directly on the details page in a responsive modal.

Favorites System: Add or remove any movie to your "Favorites" list. This list is persistent and saved in the browser's localStorage.

Search: A real-time search bar in the header to find any movie or person.

People Pages: Browse popular actors and view their detailed biographies and filmographies.

Advanced UI States:

Skeleton Loaders: Professional skeleton screens are shown while pages are loading.

Error States: Clear error messages are displayed if an API call fails.

Empty States: A "Nothing Found" message is shown for empty search results or categories.

Responsive Design: The layout is fully responsive, featuring a clean desktop header and a mobile-friendly layout with a slide-out Sheet menu and Dialog search.

User Feedback: Sonner toasts provide instant confirmation when adding/removing favorites.

Dark/Light Mode: A theme toggle button in the header allows users to switch between light and dark modes.

Tech Stack

Framework: React 18

Bundler: Vite

Styling: Tailwind CSS (v4 via @tailwindcss/vite)

UI Components: ShadCN UI (used for Button, Sheet, Dialog, DropdownMenu, Skeleton, Toaster, etc.)

Routing: React Router v6

State Management:

Redux Toolkit: For fetching and caching remote API data (movie/person details).

React Context + localStorage: For managing local user state (favorites list).

Data Fetching: Axios

Theming: next-themes

Notifications: sonner

Icons: lucide-react

Project Setup & Local Installation

Follow these instructions to run the project on your local machine.

1. Clone the Repository

git clone [https://github.com/JuberQureshi01/Movie-Exolorer.git](https://github.com/JuberQureshi01/Movie-Exolorer.git)
cd your-repo-name


2. Install Dependencies

This project uses npm to manage packages.

npm install


3. Set Up Your API Key (CRITICAL)

This project requires a TMDB (The Movie Database) API Key to fetch data.

How to get your key:

Go to https://www.themoviedb.org/.

Create a free account and sign in.

Go to your Account Settings, then click the "API" tab.

And then click on the generate the new api key and fill the req form after that you will get your token key 

 It's an "Access Token" that is a very long string.

How to add your key:

In the root of the project, create a new file named .env.local.

Open this new file and add the following line, pasting your API Access Token where it says your_key_here:

VITE_API_KEY=your_key_here


This file is already in the .gitignore, so your key will be kept secure and will not be committed to GitHub.

4. Run the Development Server

You're all set! Run the app.

npm run dev


The app should now be running on http://localhost:5173 (or a similar port).
