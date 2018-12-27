module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('example');
    });

    // Backend service for Vue.js application
    app.get('/ajax/main/people', (req, res) => {
        res.send({
            people : [
                {
                    name: 'John Smith',
                    type: 'Admin',
                    active: true
                },
                {
                    name: 'Adam Borwn',
                    type: 'Standard',
                    active: false
                }
            ]
        });
    });

};