module.exports = function (app) {

    app.get('/', (req, res) => {
        console.log('Current user', req.currentUser);
        res.render('example', {
            foo: 123,
            user: req.session.user || {},
        });
    });

    // Backend service for Vue.js application
    app.get('/ajax/main/people', (req, res) => {
        res.send({
            people : [
                {
                    id: 1,
                    name: 'John Smith',
                    type: 'Admin',
                    active: true
                },
                {
                    id: 2,
                    name: 'Adam Borwn',
                    type: 'Standard',
                    active: false
                }
            ]
        });
    });

};