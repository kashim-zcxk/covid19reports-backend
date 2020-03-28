"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../controller/country_controller"));
const router = express_1.Router();
const jwt = require('jsonwebtoken');
router.get('/cases', (req, res) => {
    controller.getLatestCases((err, cases) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        return res.status(200).json({
            ok: true,
            cases
        });
    });
});
router.get('/countries', (req, res) => {
    controller.getAllCountries((err, countries) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        return res.status(200).json({
            ok: true,
            countries
        });
    });
});
router.get('/country', (req, res) => {
    let name = req.query.name;
    controller.getOneCountry(name, (err, country) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        return res.status(200).json({
            ok: true,
            country
        });
    });
});
router.post('/subscription', (req, res) => {
    let email = req.body.email;
    let country = req.body.country;
    controller.getOneCountry(country, (err, country) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        for (let i = 0; i < country.subscriptions.length; i++) {
            if (email === country.subscriptions[i]) {
                return res.json({
                    ok: false,
                    message: 'Email ya en uso'
                });
            }
        }
        country.subscriptions.push(email);
        country.save((err, country) => {
            if (err) {
                return res.json({ ok: false, err });
            }
            return res.status(200).json({
                ok: true,
                email
            });
        });
    });
});
router.post('/subscription/cancel', (req, res) => {
    let token = req.body.token;
    jwt.verify(token, 'seed', (err, decoded) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        controller.getOneCountry(decoded.country, (err, country) => {
            if (err) {
                return res.json({ ok: false, message: 'Algo salió mal. La url no es correcta.' });
            }
            for (let i = 0; i < country.subscriptions.length; i++) {
                if (decoded.email === country.subscriptions[i]) {
                    country.subscriptions.splice(i, 1);
                }
            }
            country.save((err, country) => {
                if (err) {
                    return res.json({ ok: false, err });
                }
                return res.status(200).json({
                    ok: true,
                    message: 'ok, unsubscribe'
                });
            });
        });
    });
});
router.get('/global', (req, res) => {
    controller.getGlobalCases((err, global) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        return res.status(200).json({
            ok: true,
            global
        });
    });
});
exports.default = router;
