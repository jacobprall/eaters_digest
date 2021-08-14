import { Response, Request, Application } from 'express';
import { Pool } from 'pg';
import { IRestaurant, Body } from './restaurant';

module.exports = (app: Application, pool: Pool) => {
  // create new restaurant entry
  app.post('/restaurants', async (req: Request<Body>, res: Response) => {
    try {
      const restaurant: IRestaurant = req.body;
      const {
        restaurant_name,
        city,
        cuisine,
        description,
        price,
        visit_date,
        rating,
        favorite,
      } = restaurant;
      let visitDate: Date;
      if (restaurant.visit_date) {
        visitDate = new Date(visit_date);
        restaurant.visit_date = visitDate;
      }
      const isExisting =
        await(
          await pool.query(
            'SELECT * FROM restaurants WHERE restaurant_name = ($1)',
            [restaurant_name]
          )
        ).rows.length !== 0;
      if (!isExisting) {
        const newRestaurant = await pool.query(
          'INSERT INTO restaurants (restaurant_name, city, cuisine, description, price, visit_date, rating, favorite) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          [
            restaurant_name,
            city,
            cuisine,
            description,
            price,
            visit_date,
            rating,
            favorite,
          ]
        );
        res.json(newRestaurant.rows[0]);
      } else {
        res.json('Already in database');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  });

  // get all restaurants

  app.get('/restaurants', async (req: Request, res: Response) => {
    try {
      const allRestaurants = await pool.query('SELECT * FROM restaurants');
      res.json(allRestaurants.rows);
    } catch (e) {
      console.log(e);
    }
  });

  // modify restaurants by id
  app.put('/restaurants/:id', async (req: Request, res: Response) => {
    try {
      const restaurantQuery: IRestaurant = await (
        await pool.query(
          'SELECT * FROM restaurants WHERE restaurant_id = ($1)',
          [req.params.id]
        )
      ).rows[0];
      if (!restaurantQuery) {
        res.json('restaurant does not exist');
      } else {
        const {
          restaurant_name,
          city,
          cuisine,
          description,
          price,
          visit_date,
          rating,
          favorite,
        } = Object.assign(restaurantQuery, req.body);
        const updateQuery: IRestaurant = await(
          await pool.query(
            'UPDATE restaurants SET restaurant_name = ($2), city = ($3), cuisine = ($4), description = ($5), price = ($6), visit_date = ($7), rating = ($8), favorite = ($9) WHERE restaurant_id = ($1) RETURNING *',
            [
              req.params.id,
              restaurant_name,
              city,
              cuisine,
              description,
              price,
              visit_date,
              rating,
              favorite,
            ]
          )
        ).rows[0];
        res.json(updateQuery);
      }
      
    } catch (error) {
      console.log(error);
    }
  });

  app.delete('/restaurants/:id', async (req: Request, res: Response) => {
    try {
      const deleteQuery: IRestaurant | undefined = await (await pool.query('DELETE FROM restaurants WHERE restaurant_id = ($1) RETURNING *', [req.params.id])).rows[0];
      if (!deleteQuery) {
        res.json('Entry does not exist');
      }
      res.json(deleteQuery);
    } catch (error) {
      console.log(error)
    }
  })
};
