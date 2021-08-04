const { MongoClient, Db } = require('mongodb');
const uri = "mongodb+srv://mongoadminuser:mongoadminpassword@cluster0.vbvmm.mongodb.net/first_database?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const {listDatabases, createProject, getAllProject, createClusterInProject, getAllUserInOneProject, createTeamInProject
,addUserToOrg, addUserToTeam, getDatabaseUsersfromProjectId} = require('./service');

async function main(){
    try {
        await client.connect();
    
        const response = await listDatabases(client);
        console.log('response -> ', response);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createProjectInOrg(name){
    try {
        const response = await createProject(name);
        console.log('response -> ', response);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getAllProjectInOrg(){
    try {
        const response = await getAllProject();
        console.log('response -> ', response);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createCluster(){
    try {
        const response = await createClusterInProject('FirstCluster','61017ea7811566202c046b85');
        console.log('response -> ', response);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getDatabaseUsersfromProject(){
    try {
        const response = await getDatabaseUsersfromProjectId('61017ea7811566202c046b85');
        console.log('response -> ', response);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

getAllProjectInOrg().catch(console.error);
//createProjectInOrg('secondProject').catch(console.error);
//addUserToOrg('"jiten.miglani@janbask.com"').catch(console.error);
//createCluster().catch(console.error);
//getDatabaseUsersfromProject().catch(console.error);
//createTeamInProject('team', 'rajeshshegokar510@gmail.com').catch(console.error); // error in atlas api 
//addUserToTeam("jiten.miglani@janbask.com").catch(console.error);
//getAllUserInOneProject().catch(console.error);
// main().catch(console.error);