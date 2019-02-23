module.exports = function (app) {

    app.get('/welcome', (req, res) => {

        res.render('welcome', {
            user: req.session.user || {}
        });
    });

};