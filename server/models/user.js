const fs = require("fs");
const rootDir = require("../utils/path");
const path = require("path");
const p = path.join(rootDir,'data','users.json');

const getUserFile = (cb) => {
    fs.readFile(p,(err,fileContent) => {
        if(err){
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}

class User {
    constructor(id,name){
        this.id=id;
        this.name = name;
    }

    save() {
        getUserFile(users => {
            if(this.id){
                const index = users.findIndex(p => p.id === this.id);
                let user = users[index];
                user = this;
                users[index] = user;
            }else{
                this.id = Math.random().toString();
                users.push(this);
            }
            fs.writeFile(p,JSON.stringify(users),err => {
                console.log(err);
            });
        });
    }

    static getById(id,cb) {
        getuserFile(users => {
            const user = users.find(user => user.id === id);
            cb(user);
        });
    }

    static getAll(cb) {
        getuserFile(cb);        
    }

    static delete(id){
        getuserFile(users => {
            const index = users.findIndex(p => p.id === id);
            const user = users[index];
            users.splice(index,1);
            fs.writeFile(p,JSON.stringify(users),err => {
                if(!err){
                    return true;
                }
                console.log(err);
            });
        });
    }
}

module.exports = User;