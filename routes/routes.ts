import { Router, Request, Response } from 'express';

import * as controller from '../controller/country_controller';

const router = Router();
const jwt = require('jsonwebtoken');

router.get('/cases', (req: Request, res: Response) => {
    
    controller.getLatestCases((err: any, cases: any) => {
        if ( err ) {
            return res.json({ok: false, err});
        }

        return res.status(200).json({
            ok: true,
            cases
        })
    });
});

router.get('/countries', (req: Request, res: Response) => {

    controller.getAllCountries((err: any, countries: any) => {
        if ( err ) {
            return res.json({ok: false, err});
        }
    
        return res.status(200).json({
            ok: true,
            countries
        });
    });
});

router.get('/country', (req: Request, res: Response) => {

    let name = req.query.name;

    controller.getOneCountry(name, (err: any, country: any) => {
        if ( err ) {
            return res.json({ok: false, err});
        }
    
        return res.status(200).json({
            ok: true,
            country
        });
    });

});

router.post('/subscription', (req: Request, res: Response) => {
    let email = req.body.email;
    let country = req.body.country;
    
    controller.getOneCountry(country, (err: any, country: any) => {
        if ( err ) {
            return res.json({ok: false, err});
        }

        for ( let i = 0; i < country.subscriptions.length; i++ ) {
            if ( email === country.subscriptions[i] ) {
                return res.json({
                    ok: false,
                    message: 'Email ya en uso'
                });
            }
        }

        country.subscriptions.push(email);

        country.save( (err: any, country: any) => {
            if ( err ) {
                return res.json({ok: false, err});
            }
            return res.status(200).json({
                ok: true,
                email
            })
        });
        
    });
});

router.post('/subscription/cancel', (req, res)=> {

    let token = req.body.token;

    jwt.verify( token, 'seed', (err: any, decoded: any) => {
        if( err ){
            return res.json({ok: false, err});
        }

        controller.getOneCountry(decoded.country, (err: any, country: any) => {
            if ( err ) {
                return res.json({ok: false, message: 'Algo salió mal. La url no es correcta.'});
            }

            for ( let i = 0; i < country.subscriptions.length; i++ ) {
                if ( decoded.email === country.subscriptions[i] ) {
                    country.subscriptions.splice(i, 1);
                }
            }

            country.save( (err: any, country: any) => {
                if ( err ) {
                    return res.json({ok: false, err});
                }
                return res.status(200).json({
                    ok: true,
                    message:'ok, unsubscribe'
                });
            });
        });
    });

});

router.get('/global', (req: Request, res: Response) => {
    controller.getGlobalCases((err: any, global: any) => {
        if ( err ) {
            return res.json({ok: false, err});
        }

        return res.status(200).json({
            ok: true,
            global
        })
    });
});


export default router;