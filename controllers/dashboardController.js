export const index = (req, res) => {
    res.render('admin', {
        title: 'Net_test DB Dashboard',
        totalOrders: 5000,
        peakYield: '5.2%',
        blenderYield: '4.2%',
        valueLeader: 'Russia'
    });
};

//act5