const express = require('express');
const request = require('request');
const repeat = require('repeat');
const twilio = require('twilio');
const moment = require('moment');
const config = require('./config.js');

const app = express();
const client = new twilio(config.twilio.accountSid, config.twilio.token);

function mainCheck(){
    request.get(config.server.main).on('response',(response)=>{
        if(response.statusCode === 200){
            console.log(`Main: ${response.statusCode} -- ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
        }else{
            console.log(`Main: ${response.statusCode} -- ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
            config.recipients.forEach((recipient)=>{
                client.messages.create({
                    to: recipient,
                    from: config.twilio.PhoneNumber,
                    body: `Main API Responded with status code: ${response.statusCode} on ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`
                  });
            })
        }    
    });  
}

function devCheck(){
    request.get(config.server.dev).on('response',(response)=>{
        if(response.statusCode === 200){
            console.log(`Dev:  ${response.statusCode} -- ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
        }else{
            console.log(`Dev:  ${response.statusCode} -- ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
            config.recipients.forEach((recipient)=>{
                client.messages.create({
                    to: recipient,
                    from: config.twilio.PhoneNumber,
                    body: `Dev API Responded with status code: ${response.statusCode} on ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`
                  });
            })
        }   
    });  
}

repeat(devCheck).every(5,'minutes').start.now();
repeat(mainCheck).every(5,'minutes').start.now();
