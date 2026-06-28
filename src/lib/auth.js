import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"


const client = new MongoClient(process.env.MONGO_URL);
const db = client.db('Demo');

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [process.env.BETTER_AUTH_URL].filter(Boolean),
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    user: {
       additionalFields: {
          role: {
              type: "string",
              input: true
            },
          status : {
            type : "string",
            input : true
          },
          district : {
            type : 'string',
            input : true
          },
          upazila : {
            type : 'string',
            input : true
          }
          
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    session : {
        cookieCache : {
            enabled : true,
            strategy : 'jwt',
            maxAge : 24*60*60
        }
    },
     plugins: [
        jwt(), 
    ]
});