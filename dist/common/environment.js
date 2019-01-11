"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://pcolantuomo:020794%40pc@study-cluster-shard-00-00-8b9lf.mongodb.net:27017,study-cluster-shard-00-01-8b9lf.mongodb.net:27017,study-cluster-shard-00-02-8b9lf.mongodb.net:27017/study-db?ssl=true&replicaSet=study-cluster-shard-0&authSource=admin&retryWrites=true' }
};
