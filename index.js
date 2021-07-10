const { MongoClient, Db } = require('mongodb');
const uri = "mongodb+srv://mongoadminuser:mongoadminpassword@cluster0.vbvmm.mongodb.net/first_database?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const {listDatabases, createProject, getAllProject, createClusterInProject} = require('./service');

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
        const response = await createClusterInProject();
        console.log('response -> ', response);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
createCluster().catch(console.error);
//getAllProjectInOrg().catch(console.error);
//createProjectInOrg('secondProject').catch(console.error);
// main().catch(console.error);