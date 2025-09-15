import { use } from 'react';
import conf from '../../conf.js';
import { Client, Databases, Storage, ID, Query } from 'node-appwrite';


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Accoount(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug, content, featuredImage, status, userId}) {
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            });

        }catch(err){
            throw err;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}) {
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            });
        }catch(err){
            throw err;
        }
        
    }

    async deletePost(slug) {
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        }catch(err){
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        }catch(err){
            return false;
        }
    }

    // ONly apply query if we applied indexes 
    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try{
            const result = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId,queries);
            return result.documents;
        }catch(err){
            throw err;
        }
    }

    // File upload 

    async uploadFile(file) {
        try{
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        }catch(err){
            return false;
        }
    }

    async deleteFile(fileId) {
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        }catch(err){
            return false;
        }
    }

    async getFilePreview(fileId) {
        try{
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        }catch(err){
            return false;
        }   
    }

}


const service = new Service();

export default service;