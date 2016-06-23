# README #



### What is this repository for? ###

* Quick summary :This is a webODf document editor tool for editing odt files and saving ,also provides a interface the select and open desired documents.
* Version : 1.0.0


### How do I get set up? ###
* **Summary of set up** 
   * This HTML5 web-application requires node.js run-time installation on system to perform back-end logic. Also requires the npm package manager which come's along with the node environment. The npm (node pacakage manger) is used to fetch and install dependencies necessary for project to run.This can be done by running 'npm install' in the root directory where the server files are located,make sure you have 'package.json' file present in directory as well.
   * Once all the dependencies are installed ,you are good to go just run 'node index' in terminal ....And that's it ! your server is up and running on [localhost:3000](http://localhost:3000/). And when you hit this url you will see the home page of document-editor.

* **Configuration**
   * First extract a zip containing the source code for html and server files in a directory.
   * Make sure you have node.js and npm  environment installed on you system.Instructions
    for installing Node.js,please refer: 
    - [Linux Systems](https://nodejs.org/en/download/package-manager/)
    - [Windows OS](http://www.wikihow.com/Install-Node.Js-on-Windows)
    - [CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server)
    - Install nodejs by executing :  *wget http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz* 
    - Then extract the package *sudo tar --strip-components 1 -xzvf node-v* -C /usr/local*
    - To check if installation is succesfull run *node -v*, it should print the version of nodejs.
    - Make sure Git is installed on your system (*sudo yum install git*)
    - Also in case you are unable to perform node install without using 'sudo' , fix it using [this steps](http://stackoverflow.com/questions/26612649/please-try-running-this-command-again-as-root-administrator-error-when-trying).
    - Now cd into project root directory and run *npm install* followed by node index.js.
     
* **Dependencies** : webODF,jquery,bootstrap,node.js,etc
* **Database configuration** : None
* ** Deployment instructions**
   * Once you have a node.js instalation ready(check by running 'node --version' in terminal)
   * Extract the zip of source code.
   * 'cd' into the directory where you extracted the code.
     * ./ document-editor
     *  --/app
     *  --/index.js
     *  --/package.json 
     *  --/.....and some other auto-generated files.
   * Run 'npm install',this will install all the dependencies required for project to run.
   * Run 'node index' and you will have you server up and running.



### Who do I talk to? ###

* Amit Jagtap 
* damitj07@gmail.com