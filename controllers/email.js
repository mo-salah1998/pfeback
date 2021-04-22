const nodemailer = require('nodemailer');
const {google}= require('googleapis');

const CLIENT_ID='1090634226232-8avuf8baa8jaughbo3kvn3pjj3iab0q4.apps.googleusercontent.com';
const CLIENT_SECRET='0KngQypOdNRn3KoK4cm5xsaa';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04mWbwn0mxpcuCgYIARAAGAQSNwF-L9IrRTLLvd35Uc1W2kLMTa-IRL0AceB5MrE7HGyMqSWuvtbtuBKp-B7TRtZFz8njRSYfTFk';
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendmail = async (req,res,next) => {

    try {



        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'naija963@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'mouhamed salah naija <naija963@gmail.com>',
            to: 'mouhamed199863@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}
module.exports = sendmail


