
require('dotenv').config();

const nodemailer = require('nodemailer');
const {gmail} = require("googleapis/build/src/apis/gmail");
const {google}= require('googleapis');
const googleAuth = require('google-auth-library');


const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
exports.sendmail = async (req,res,next) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'naija963@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'mouhamed salah naija <naija963@gmail.com>',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            //html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        res.status(200).json(result);
    }catch (error) {
        res.status(500).json({error: error.message})
    }

};

exports.inbox = async (req,res,next) => {
    try {
        const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );
        oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
        const accessToken = await oAuth2Client.getAccessToken();
       // const transport = nodemailer.createTransport({
       //     service: 'gmail',
       //     auth: {
       //         type: 'OAuth2',
       //         user: 'naija963@gmail.com',
       //         clientId: process.env.CLIENT_ID,
       //         clientSecret: process.env.CLIENT_SECRET,
       //         refreshToken: process.env.REFRESH_TOKEN,
       //         accessToken: accessToken,
       //     },
       // });

        const gmail = google.gmail({version: 'v1', auth: {
                type: 'OAuth2',
                user: 'naija963@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        //listLabels(oAuth2Client)
        inbox(oAuth2Client)
    }catch (error) {
        res.status(500).json({error: error.message})
    }

}
function listLabels(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.labels.list({
        userId: 'naija963@gmail.com',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
            console.log('Labels:');
            labels.forEach((label) => {
                console.log(`- ${label.name}`);
            });
        } else {
            console.log('No labels found.');
        }
    });
}
function inbox(auth) {
    var maxResults = 5;
    var inboxId = [];

    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        userId: 'naija963@gmail.com',
        labelId: ['INBOX','IMPORTANT'],
        maxResults: maxResults,
        includeSpamTrash: false,
        q: "is:unread"
    }, function (err, response) {
        if (err) {
            throw(err);
        }
        //console.log(response.data)
        for(var i = 0; i < maxResults; i++) {
            if (inboxId.length < maxResults) {
                inboxId.push(response.data.messages[i].id);
            }
        }
        console.log(inboxId);
        //getEmails(auth, inboxId); //Invoked after inboxId array is equal to maxResults variable
        inboxId.forEach((id) => {
            request = gmail.users.messages.get({
                userId: 'naija963@gmail.com',
                id: id
            }, (err, res) => {
                data = res.data.snippet;
                    console.log(res);

            });
        })
    });
}
var getEmails = function(auth, inboxId) {
    var emailData = {};

    inboxId.forEach(function(elem, i) {
        gmail.users.messages.get({
            userId: 'naija963@gmail.com',
            id: elem
        }, function (err, response) {
             console.log(response.payload.headers);
            if(response.payload.body.data === undefined) {
                emailData[i] = {
                    id: response.id,
                    subject: response.payload.headers.filter( function(header) {
                        return header.name === 'Subject';
                    })[0].value,
                    threadId: response.threadId,
                    from: response.payload.headers.filter( function(header) {
                        return header.name === 'From';
                    })[0].value,
                    to: response.payload.headers.filter(function(header) {
                        return header.name === 'To';
                    })[0].value,
                    body: atob(response.payload.parts[0].body.data)}
            } else {
                emailData[i] = {id: response.id, subject: response.payload.headers.filter( function(header) {
                        return header.name === 'Subject';
                    })[0].value, threadId: response.threadId, from: response.payload.headers.filter(function(header) {
                        return header.name === 'From';
                    })[0].value, to: response.payload.headers.filter(function(header) {
                        return header.name === 'To';
                    })[0].value, body: atob(response.payload.body.data)}
            };
            if (err) {
                throw(err);
            } else {
                if (Object.keys(emailData).length === maxResults ) {
                    //ask(); // Uses counter to invoke script once emailData is created matching the number of maxResults
                };
            };
        });
    });
};
