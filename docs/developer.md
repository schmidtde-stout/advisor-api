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

**To run the API server**, from a Terminal: run `npm start`

**To run the API server with nodemon**, from a Terminal: run `npm dev`, this will monitor for changes to codebase and will restart the server automatically if it detects a change, pretty nice for active development and testing.

**To run the API server in debug**, with vcode: Run > Start Debugging, Select Node.js if prompted

**To run all Jest tests**, from a Terminal: run `npm test`

**To run all Jest tests in debug**, from a Terminal: run `npm test:debug`

#### Obtaining Bearer Tokens

_Magic Links_
The bearer token is actually a Stytch session identifier. When the Front End (FE) authenticates a user email, it will send an authentication token in a "Magic Link" via an email to this token. The "Magic Link" is actually a redirection to the FE with this authentication token. The FE will then use this token to confirm authentication with Stytch, upon successful authentication Stytch will return a session identifer (_Bearer Token_). [See this link how a token is identifer and a session identifier is produced](https://stytch.com/docs/api/authenticate-magic-link).

![Authentication Architecture](https://stytch.imgix.net/web/_next/static/image/src/img/dashboard/light-mode-api-flow.80200ea99265b20c7bcb14c477357ec6.png?ixlib=js-3.3.0&auto=format&quality=75&width=1920)

_Bearer Token usage in API_

Every request received by the API must also be accompanied with the Stytch session identifier carried in the [Authorization header as a Bearer Token](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). This session identifier is then [authenticated with Stytch](https://stytch.com/docs/api/session-auth) before it proceeds with the API task, see the auth service.

_How to Obtain a Bearer Token_

Essentially, you need mimic what the FE does to [generate a magic link](https://stytch.com/docs/api/log-in-or-create-user-by-email) with the Stytch Project ID and Secret (listed in Canvas) and your email address. You can make the request easily with CURL or you can use postman. When you receive the email, you can use that link (with the token) to then authenticate your email with Stytch (described above) and obtain the session identifier.

_TODO_ - Add Postman scripts with shortcuts to generate a magic link and authenticate token to obtain a session identifier.

### Development Conventions

- Modules are either:
  - Interface, module.exports is an object, i.e. Services, Models
  - Instance, module.exports is a function returning in an instance, Apps and Routes
- snake_case for Model columns, JSON fields, and Database tabel columns. This was inherited from Stytch conventions and the fact PostgreSQL automatically unfolds all unquoted identifiers. CamelCase conventions for all other the javascript names.

### Definition of Done

- Models require unit testing all functions mocking necessary services (i.e. database, environment)
- Routes require unit testing all expected outcomes mocking the Models used
- Routes require postman happy path integration tests
- Source code is fully linted with no warnings
- All jest tests run successfully
- Pull request to staging branch
- Staging branch sucessfully deployed to staging environment
- (TODO) Integration tests run successfully on staging environment
