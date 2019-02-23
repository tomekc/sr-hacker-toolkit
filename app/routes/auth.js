const Config = require('config');
const API = require('api');
const Request = require('superagent');
const Querystring = require("querystring");

module.exports = function (app) {

    app.get('/login', (req, res) => {
        console.log('Current user', req.currentUser);
        res.render('login', {
            user: req.session.user || {},
            foo: 123,
            client_id: Config.oauth.client_id,
            redirect_uri: Querystring.escape(Config.oauth.redirect_uri),
            scopes: Querystring.escape(Config.oauth.scopes)
        });
    });

    app.get('/auth/callback', (req, res) => {
        let code = req.query.code;
        Request.post('https://www.smartrecruiters.com/identity/oauth/token')
            .send('grant_type=authorization_code')
            .send('client_id=' + Config.oauth.client_id)
            .send('client_secret=' + Config.oauth.client_secret)
            .send(`code=${code}`)
            .end((err, rsp) => {

                if (rsp.status === 200) {
                    req.session.user = {
                        accessToken: rsp.body.access_token,
                        refreshToken: rsp.body.refresh_token,
                        loggedIn: true,
                        name: '-'
                    };

                    console.log('Will obtain user details...');
                    console.log(`Bearer: ${req.session.user.accessToken}`);

                    API.aboutMe(req.session.user.accessToken, (err, rsp) => {
                        if (rsp.status === 200) {
                            let name = `${rsp.body.firstName} ${rsp.body.lastName}`;
                            console.log(`Welcome, ${name}`);
                            req.session.user.name = name;
                        }
                        if (err) {
                            console.log('Hmm. Error', err.status, err.body);
                        }
                        res.redirect('/welcome');
                    });

                } else {
                    // login failed
                    req.session.user = {
                        name: '',
                        loggedIn: false
                    };
                    res.redirect('/welcome');
                }
            });

    });

};