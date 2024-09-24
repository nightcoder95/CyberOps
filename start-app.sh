#!/bin/bash
cd server    # Change to the backend folder
npm start &   # Start the server in the background
cd ../client  # Change to the frontend folder
npm run dev   # Start the frontend
