const Api = require('api');
const _ = require('lodash');

module.exports = function (app) {

    function convertJobList(jobs) {
        return _.map(jobs, (j) => {
            return _.pick(j, ['title', 'refNumber', 'status']);
        });
    }


    app.get('/jobs', (req, res) => {

        const user = req.session.user || {};

        Api.jobs(user.accessToken, (err, rsp) => {

            console.log(rsp.status);
            console.log(convertJobList(rsp.body.content));


            if (rsp.status === 200) {
                res.render('jobs', {
                    user: req.session.user || {},
                    jobs: convertJobList(rsp.body.content)
                });
            } else {
                res.render('jobs', {
                    user: req.session.user || {},
                    jobs: null,
                    error: err.message
                });
            }


        });

    });

};