const httpClient = require('urllib');

const config = {
    baseUrl: 'https://cloud.mongodb.com/api/atlas/v1.0',
    publicKey: 'uizpmvji',
    privateKey: 'd21a3485-9abc-427c-8226-f306f7a53c00',
    orgId: '61017ea7811566202c046b7f'
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    return databasesList;
};

async function createProject(projectName){
    
    const options = {
        method: 'POST',
        rejectUnauthorized: false,
        digestAuth: `${config.publicKey}:${config.privateKey}`,
        data: {
            name: projectName,
            orgId: config.orgId
        },
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      const responseHandler = (err, data, res) => {
        if (err) {
          console.log(err);
        }

        return data.toString('utf8');
      }
      await httpClient.request(config.baseUrl + '/groups', options, responseHandler);
};

async function getAllProject(){
  
  const options = {
      method: 'GET',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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


async function createClusterInProject(clusterName, groupId){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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
 
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/groups/' + groupId + '/clusters?pretty=true"', options, responseHandler);
};

async function getAllUserInOneProject(groupId){
  
  const options = {
      method: 'GET',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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
    await httpClient.request(config.baseUrl + '/groups/' + groupId + '/users', options, responseHandler);
};

async function createTeamInProject(teamName, username){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/orgs/'+ config.orgId + '/teams', options, responseHandler);
};

async function addUserToOrg(emailId){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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
      console.log(data.toString('utf8'));
      return data.toString('utf8');
    }
    await httpClient.request(config.baseUrl + '/orgs/'+ config.orgId + '/invites', options, responseHandler);
};

async function addUserToTeam(emailId, teamId){
  
  const options = {
      method: 'POST',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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
    await httpClient.request(config.baseUrl + '/orgs/'+ config.orgId + '/teams/' + teamId + '/users', options, responseHandler);
};

async function getDatabaseUsersfromProjectId(projectId){
  
  const options = {
      method: 'GET',
      rejectUnauthorized: false,
      digestAuth: `${config.publicKey}:${config.privateKey}`,
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
    return await httpClient.request(config.baseUrl + '/groups/' + projectId+ '/databaseUsers', options, responseHandler);
};


module.exports = {
    listDatabases,
    createProject,
    getAllProject,
    createClusterInProject,
    getAllUserInOneProject,
    createTeamInProject,
    addUserToTeam,
    getDatabaseUsersfromProjectId
}