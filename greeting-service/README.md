# DSFH-dashboard
Link to main github repo ==> https://github.com/ST2-EV/DSFH

### Description:
A dashboard appliation for the DSFH platform. This allows the user to train and deploy  predictive models. Refer main github for more details.

### Installation:
First git clone,<br />
```$ git clone https://github.com/ST2-EV/DSFH-dashboard.git```<br />
```$ cd DSFH-dashboard```
<br />
<br />
Go to src/fire.js and addfire base config.
<br />
Go to src/components/DeployForm.js and add the backend's url here.<br />
```const socket = io.connect("<BACKEND_URL>");```
<br />
<br />
Then,<br />
``` npm install```<br />
```npm start```<br />

Your dashboard will be running at localhost:3000.

### Credits:
[Steve Paul](https://github.com/ST2-EV),&nbsp; [Bharath Nair](https://github.com/bnair2001)
