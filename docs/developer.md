## Developer Notes for Advisor API

### Development Environment Setup

#### Required Tools

- Node.js
- PostgreSQL
- Visual Studio Code
- GitHub Desktop
- Postman

#### Setup Instructions

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
  - Open a Terminal: Terminal > New Terminal
  - Type `npm install`
- Install the following vscode extensions:
  eslint, prettier, prettier eslint, markdown all in one

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

**To run the API server**, from a terminal: run `npm start`

**To run the API server with nodemon**, from a terminal: run `npm run dev`, this will monitor for changes to codebase and will restart the server automatically if it detects a change, pretty nice for active development and testing.

**To run the API server in debug**, with vcode: Run > Start Debugging, Select Node.js if prompted

**To run all Jest tests**, from a terminal: run `npm test`

**To run all Jest tests in debug**, from a terminal: run `npm test:debug`

#### Obtaining Bearer Tokens

Essentially, you need to mimic what the FE does to [generate a magic link](https://stytch.com/docs/api/log-in-or-create-user-by-email) with the Stytch Project ID and Secret (listed in Canvas) and your email address. You can make the request easily with CURL or you can use postman. When you receive the email, you can use that link (with the token) to then authenticate your email with Stytch (described above) and obtain the session token.

_TODO_ - Add Postman scripts with shortcuts to generate a magic link and authenticate token to obtain a session token.

### Development Conventions

- Modules are either:
  - Interface, module.exports is an object, i.e. Services, Models
  - Instance, module.exports is a function returning in an instance, Apps and Routes
- camelCase naming convention shall be used for all naming. This includes Model columns, JSON fields, and Database table columns. Note that the Stytch API uses a snake_case onvention.
- PostgreSQL automatically unfolds all unquoted identifiers into lower case. To support the camelCase standard, all database names (table names, column names, etc.) should be quoted. Note the sqltools has built in quoting.

### Definition of Done

- Models require unit testing all functions mocking necessary services (e.g. database, environment)
- Routes require unit testing all expected outcomes mocking the Models used
- Routes require postman happy path integration tests
- Source code is fully linted with no warnings
- All jest tests run successfully
- Pull request to staging branch
- Staging branch sucessfully deployed to staging environment
- Integration tests run successfully on staging environment
