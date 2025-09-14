import conf from '../conf.js';
import {Client , Accoount, ID} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Accoount(this.client);
    }

    async createAccount ({email, password, name}) {
        try{
            const account = await this.account.create(ID.unique(), email, password, name); 
            if(account){
                return this.login({email, password});
            }
            return account;
        }catch(err) {
            throw err;        
        }
    }

    async login({email,password}) {
        try{
            const result =  await this.account.createEmailSession(email, password);
            return result;
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser () {
        try{
            const result = await this.account.get();
            return result;
        }catch{
            throw err;
        }
        return null;
    }

    async logout () {
        try{
            await this.account.deleteSessions();
        }catch(err){
            throw err;
        }
    }

};

const authService = new AuthService();

export default authService;
