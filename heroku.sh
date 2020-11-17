# a bit hacky but ewasier than googling how to set up heroku buildpacks

# could also use npm ci here

cd ./app && npm i && npm run prebuild && npm run build && cd ..

cd ./backend && npm i && npm run build && npm run start

