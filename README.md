# Kashyyyk-Candles Store

This project is for a webshop for the Kashyyk-Candles brand. The store offers both candles and wax melts. Visitors to the site are able to register for an account or login to an existing account. Registered users and guests are able to add and remove items from their cart as well as proceed to a checkout confirmation page. 

An admin account is able to:
1) View registered useres,
2) Give and revoke admin right to registered useres,
3) Add, edit, and delete products,
4) View past orders

## Getting Started

1. Fork and clone this repo to your local machine, then run the following commands to reinitialize your git history from scratch:

```bash
# these commands reset your git history
$ rm -rf .git
$ git init
```

2. Create a bare GitHub repo (no `.gitignore`, `README.md`, `CHANGELOG.md`, or license) and copy the ssh address to assign to your local clone with `git remote add origin <paste-your-ssh-address-here>`

3. `npm install` to add project dependencies to your local machine.

4. Choose a name for your local database instance and edit `db/index.js` to assign the name to `DB_NAME`. Next, run `createdb <your-db-name-goes-here>` from your command line to spin up your database.

5. `npm run start:dev` will build your React app and start your express server in concurrent mode (meaning that both processes run in the same terminal window). Once this command is running, you can start developing! `nodemon` and `react-scripts` will listen to file changes and update continuously (hot-module-reloading).

<em>NB: If you see a `proxy error` message in the terminal, just hard refresh your browser window and you'll be all set.</em>

## Command Line Tools

In addition to `start:dev`, `client:build`, `client:dev` and `server:dev`, you have access to `db:build` which rebuilds the database, all the tables, and ensures that there is meaningful data present.

# Kashyyyk-Candles Staff

## Our staff includes:
<div><a href="https://github.com/AshCheeks">AshCheeks</a></div>
<div><a href="https://github.com/cboonelearn">cboonelearn</a></div>
<div><a href="https://github.com/INIKITS">INIKITS</a></div> 
<div><a href="https://github.com/kasie-espi">kasie-espi</a></div>
