import ElasticEmail from '@elasticemail/elasticemail-client';
import "dotenv/config";

const { ELASTICEMAIL_FROM, ELASTICEMAIL_API_KEY } = process.env
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications['apikey'];

apikey.apiKey = ELASTICEMAIL_API_KEY;

const emailsApi = new ElasticEmail.EmailsApi();
const callback = function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully.');
    }
};
const sendElasticEmail = (emailData) => {
    emailsApi.emailsPost(emailData, callback);
    return true
}

export default sendElasticEmail;