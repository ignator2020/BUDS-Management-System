const express = require('express');
const instituteRouter = express.Router();
const InstituteData = require('../model/Database').InstituteData;
const CredentialData = require('../model/Database').CredentialData;

router = ()=>{
    instituteRouter.post('/register',(req,res)=>{               //Register new institute
        // Fetch user inputs from form
        let newInstitute = {
            name: req.body.name,
            district: req.body.district,
            lsgi: req.body.lsgi,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type,
            approved: false         //Set to true only after admin's approval
        };
        let newInstituteCredentials = {
            email: req.body.email,
            role: 'institute',
            approved: false         //Set to true only after admin's approval
        }
        CredentialData.findOne({email:newInstituteCredentials.email})
        .then((user)=>{
            if(user){       // Email id already in use
                res.status(409).send('This email id is alredy registered.');
            }
            else{
                generateId()
                .then((newId)=>{
                    newInstitute.id = newId;
                    newInstituteCredentials.id = newId;
                    CredentialData(newInstituteCredentials).save()                        //Save credentials
                    InstituteData(newInstitute).save()                                    //Save institute details
                    res.status(200).send();
                })
                .catch((err)=>{
                    console.log(err);
                    //Handle error here
                    res.status(500).send("Sorry, Error in accessing database. Please try later.");
                });
            }
        })
        .catch((err)=>{
            console.log(err);
            //Handle error here
            res.status(500).send("Sorry, Error in accessing database. Please try later.");
        });
    });

    return instituteRouter;
}

function generateId(){
    return new Promise(function(resolve,reject){
        //Get latest added institute profile
        InstituteData.findOne({}, "id", {sort:{$natural:-1}})
        .then((institute) => {
            let newId;
            if(institute == null){      // If no profiles found, assign id as IN1
                newId = "IN1";
            }
            else{                       // Else if profile found, detect the number part of the id and increment it.
                let lastIdNum = parseInt(institute.id.substring(2));
                newId = `IN${lastIdNum + 1}`;
            }
            resolve(newId);
        })
        .catch((err)=>{
            reject(err);
        });
    });
}

module.exports = router;