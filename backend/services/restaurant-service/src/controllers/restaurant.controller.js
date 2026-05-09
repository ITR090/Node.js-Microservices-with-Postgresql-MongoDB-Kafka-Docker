
const {client} = require('../db.js')

exports.getAll = async (req, res) => {

    try {
       const response= await client.query('SELECT * FROM restaurants')
       console.log('getAll');
       res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error fetching restaurants', error.stack);
        res.status(500).json({message:'Error fetching restaurants' ,data: error});
    }
};


exports.getById =  async (req, res) => {

    try {
        const restaurantId = req.params.id;
        const response=  await client.query('SELECT * FROM menu_items WHERE restaurant_id = $1', [restaurantId])
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error fetching restaurant', error.stack);
        res.status(500).json({message:'Error fetching restaurant', data:error});
    }
};


