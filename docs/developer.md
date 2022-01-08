# Developer Notes for Advisor API

## Development Environment Setup

### Required Tools

- Node.js
- PostgreSQL
- Visual Studio Code
- GitHub Desktop
- Postman

### Setup Instructions

Install the above tools, accept all defaults. You do NOT need to create a Postman account. Create a GitHub account with your UW-Stout email address.

_Database Setup_

- Open the pgAdmin tool.
- Set the master password
- Create a database, (i.e. advisordb), accept all defaults
- Don't create any tables or users

_Server Setup_

- Clone this repository
- Open the cloned folder in Visual Studio Code (vscode): File > Open Folder the cloned folder
- Use `npm` to install all dependent Node.js modules:
  - Open a Termainal: Terminal > New Terminal
  - Type `npm install`
- Install the following vscode extensions:
  eslint, prettier, prettier eslint

- Make the following vscode setting changes:

  - Editor: Format on Save - turn on
  - Editor: Default Formatter - Prettier - Code Formatter (esbenp.prettier-vscode)
  - Eslint › Code Actions On Save: Mode - set to problems

- In the cloned folder, create a .env file, and populate with local variables:

```env
PORT=3000
PG_CONNECTION_STRING=postgres://postgres:<masterpassword>@localhost:5432/<dbname>
STYTCH_PROJECT_ID=<See Canvas Notes>
STYTCH_SECRET=<See Canvas Notes>
MASTER_ADMIN_EMAIL=<your UW-Stout Email>
```

- set in .env

Development Conventions

- modules are either:
  - Interface, module.exports is an object, i.e. Services, Modules
  - Instance, module.exports is a function returning in an instance, Apps and Routes
