# FRONT TEMPLATE #
* V1.4


### What is this repository for? ###

* Front template with gulp, includes bootstrap


### How do I get set up? ###

**Setup**

* Run "npm install" to install node dependencies

* Then run "gulp" to compile all data and start watching tasks



**Another tasks**

* "gulp clean" to delete folders inside output (not html files)


**Deployment**

* "gulp release" to minify everything in the same place and be ready to deploy


**Retina displays**

* To generate sprite for retina displays must uncomment some lines in the gulpfile (this lines are highlighted), then must uncomment too the device density media querie in media_queries.styl file. For this to work correctly de retina icons must be the same in number with the not retina icons and should have the doble size exactly.