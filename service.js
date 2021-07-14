const httpClient = require('urllib');

const config = {
    baseUrl: 'https://cloud.mongodb.com/api/atlas/v1.0',
    publicKey: 'ketooowq',
    privateKey: '442b2888-a100-421d-b898-4de6478009b6',
    orgId: '60d84fac927d0e2d9cd151c7'
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    return databasesList;
};

async function createProject(projectName){
    const postData = {
            name: projectName,
            orgId: '60d84fac927d0e2d9cd151c7'
    };
    const options = {
        method: 'POST',
        rejectUnauthorized: false,
        digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
        data: {
            name: projectName,
            orgId: '60d84fac927d0e2d9cd151c7'
        },
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      const responseHandler = (err, data, res) => {
        if (err) {
          console.log(err);
        }
 
        //console.log(data.toString('utf8'));
        return data.toString('utf8');
      }
      await httpClient.request(config.baseUrl + '/groups', options, responseHandler);
};

async function getAllProject(){
  
  const options = {
      method: 'GET',
      rejectUnauthorized: false,
      digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    const responseHandler = (err, data, res) => {
      if (err) {
        console.log(err);
      }
      // console.log(res.statusCode);
      // console.log(res.headers);
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/groups', options, responseHandler);
};


async function createClusterInProject(clusterName){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
      data: {
        "name": clusterName,
        "diskSizeGB": 100,
        "numShards": 1,
        "providerSettings": {
          "providerName": "AWS",
          "instanceSizeName": "M40",
          "regionName": "US_EAST_1"
        },
        "clusterType" : "REPLICASET",
        "replicationFactor": 3,
        "replicationSpecs": [{
          "numShards": 1,
          "regionsConfig": {
            "US_EAST_1": {
              "analyticsNodes": 0,
              "electableNodes": 3,
              "priority": 7,
              "readOnlyNodes": 0
            }
          },
          "zoneName": "Zone 1"
        }],
        "backupEnabled": false,
        "providerBackupEnabled" : true,
        "autoScaling": {
          "diskGBEnabled": true
        }
      },
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    const responseHandler = (err, data, res) => {
      if (err) {
        console.log(err);
      }
      // console.log(res.statusCode);
      // console.log(res.headers);
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/groups/60e1e000b2e26b05936589cf/clusters?pretty=true"', options, responseHandler);
};

async function getAllUserInOneProject(){
  
  const options = {
      method: 'GET',
      rejectUnauthorized: false,
      digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    const responseHandler = (err, data, res) => {
      if (err) {
        console.log(err);
      }
      // console.log(res.statusCode);
      // console.log(res.headers);
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/groups/60eda065c7b14116570d0b32/users', options, responseHandler);
};

async function createTeamInProject(teamName, username){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
      data: { 
              name : teamName, 
              usernames: [username]       // emailId 
            },
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    const responseHandler = (err, data, res) => {
      if (err) {
        console.log(err);
      }
      // console.log(res.statusCode);
      // console.log(res.headers);
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/orgs/'+ config.orgId + '/teams', options, responseHandler);
};

async function addUserToOrg(emailId){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
      data: {
              "username": emailId,
              "roles":["ORG_MEMBER"] // can add multiple role
            },
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    const responseHandler = (err, data, res) => {
      if (err) {
        console.log(err);
      }
      // console.log(res.statusCode);
      // console.log(res.headers);
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/orgs/'+ config.orgId + '/invites', options, responseHandler);
};

async function addUserToTeam(emailId){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: "ketooowq:442b2888-a100-421d-b898-4de6478009b6",
      data: {
              "id" : emailId 
            },
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    const responseHandler = (err, data, res) => {
      if (err) {
        console.log(err);
      }
      
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/orgs/'+ config.orgId + '/teams/60eda9723099286a42d553af/users', options, responseHandler);
};

module.exports = {
    listDatabases,
    createProject,
    getAllProject,
    createClusterInProject,
    getAllUserInOneProject,
    createTeamInProject,
    addUserToTeam
}