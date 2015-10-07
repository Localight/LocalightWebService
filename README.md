# LocalLight

This project is a local giftcard. Our objective is to make a community where you can electronically send giftcards to your friends, and use those giftcards at local shops.
This will encourage community, and help people become more involved in local shops.

## Installation

To install this project, you must have the following installed on your machine:  <br />
NodeJS - https://nodejs.org/  <br />
MongoDB - https://www.mongodb.org/

Clone the repository into your local computer. <br />
Open a terminal window and run "sudo mongod". This will start the mongodb server. Leave that window open. <br />
Open a second terminal window. This will be your development window. <br />
Run "npm install" and "bower install". This will install all of the dependencies of the project onto your computer. <br />
You can then use "grunt serve" to host a local web server of the live project directory. You will then be able to view the site at 0.0.0.0:9000. <br />
In addition, you will probably want to be running the backend in conjunction. You can clone that repository and follow the instructions to make both work in tandem. http://github.com/localism/localightbackend
Any changes you make to project files will be auto-reloaded in the browser.

## Usage

This project is currently in development. This project is scaffolded using yeoman. All yeoman commands work with this project.
You may want to research AngularJS and the coding standards that come with Angular.

## Contributing

This project is currently private, so no one without permission can view it.
You should use branching rather than forking to contribute, however here are instructions on forking should you not have write-access.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Some guidelines for pull requests and issues:
When a pull is not assigned to you, do not pull it in unless specifically asked to by @mention.
When a pull request titled PROD - … Exists, pull that request in before any other requests. This is a pull from master into production. If you pull another request in before pulling that request in, you will include the pull in the sync. This is BAD, because it pulls potentially unreviewed and untested code into production.
Use labels accordingly:
backburner - Issues that are valid, but are not currently important. Issues with this tag should NOT have a milestone attached
bug - Issues that BREAK functionality or previously written code that executes unexpectedly.
cleanup - For issues dealing with messy code, or bad implementations.
design - Issues that have to do with graphical finesse. Does not include building functionality in the frontend such as forms. Has to do with styling, colors, animations etc.
discussion - Anything that is up for discussion where an approach has yet to be decided. This tag should be removed when a consensus is reached.
enhancement - Issues that improve pre-existing functionality.
needs backend - Issues that exist in the frontend, but cannot be completed without backend functionality being implemented first, or that need backend functionality to work better.
needs milestone - All issues should be created with this tag. This tag will be removed by the timeline manager when a milestone is appointed.
new feature - This tag is the opposite of enhancement. Anything that involves building new functionality should have this tag.
urgent - Any issue or pull request that requires IMMEDIATE attention.

## History

This project was originally created in MeanJS, however has now been switched to plain components of the MEAN stack. This was due to bad implementation and coding on the old project. We have now started fresh, and are using MEAN to accomplish the project goals. To assemble mean, we have compiled plain MongoDB, Express and Angular through independant sources.

## Credits

DW Ferrel @dwferrel - CEO and Inventor <br />
Aaron Turner @torch2424 - Frontend Developer <br />
Julian Poyourow @julianpoy - Backend Developer <br />

## License

This code is private and shall not be copied or used without the express permission of Localism.
