"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app, pool) => {
    // create new restaurant entry
    app.post('/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurant = req.body;
            const { restaurant_name, city, cuisine, description, price, visit_date, rating, favorite, } = restaurant;
            let visitDate;
            if (restaurant.visit_date) {
                visitDate = new Date(visit_date);
                restaurant.visit_date = visitDate;
            }
            const isExisting = (yield (yield pool.query('SELECT * FROM restaurants WHERE restaurant_name = ($1)', [restaurant_name])).rows.length) !== 0;
            if (!isExisting) {
                const newRestaurant = yield pool.query('INSERT INTO restaurants (restaurant_name, city, cuisine, description, price, visit_date, rating, favorite) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [
                    restaurant_name,
                    city,
                    cuisine,
                    description,
                    price,
                    visit_date,
                    rating,
                    favorite,
                ]);
                res.json(newRestaurant.rows[0]);
            }
            else {
                res.json('Already in database');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }));
    // get all restaurants
    app.get('/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allRestaurants = yield pool.query('SELECT * FROM restaurants');
            res.json(allRestaurants.rows);
        }
        catch (e) {
            console.log(e);
        }
    }));
    // modify restaurants by id
    app.put('/restaurants/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurantQuery = yield (yield pool.query('SELECT * FROM restaurants WHERE restaurant_id = ($1)', [req.params.id])).rows[0];
            if (!restaurantQuery) {
                res.json('restaurant does not exist');
            }
            else {
                const { restaurant_name, city, cuisine, description, price, visit_date, rating, favorite, } = Object.assign(restaurantQuery, req.body);
                const updateQuery = yield (yield pool.query('UPDATE restaurants SET restaurant_name = ($2), city = ($3), cuisine = ($4), description = ($5), price = ($6), visit_date = ($7), rating = ($8), favorite = ($9) WHERE restaurant_id = ($1) RETURNING *', [
                    req.params.id,
                    restaurant_name,
                    city,
                    cuisine,
                    description,
                    price,
                    visit_date,
                    rating,
                    favorite,
                ])).rows[0];
                res.json(updateQuery);
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    app.delete('/restaurants/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteQuery = yield (yield pool.query('DELETE FROM restaurants WHERE restaurant_id = ($1) RETURNING *', [req.params.id])).rows[0];
            if (!deleteQuery) {
                res.json('Entry does not exist');
            }
            res.json(deleteQuery);
        }
        catch (error) {
            console.log(error);
        }
    }));
};
//# sourceMappingURL=restaurantRoutes.js.map