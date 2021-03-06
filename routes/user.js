const express = require('express');
const router = express.Router();
const Mongo = require('../modules/mongo');
const {avatarFormat} = require("../utils/user");
const {partialBotObject} = require("../utils/bot");
const cache = require("../utils/imageCache");

/**
 * 
 * @param {Mongo} mongo 
 */
module.exports = (mongo, config) => {
    router.get('/:userId', (req, res) => {
        mongo.Users.findById(req.params.userId).exec().then((user) => {
            if (!user)
                res.sendStatus(404);
            cache(config).saveCached(user).then(async element => {
                element.save();
                user ? res.render("user", {
                    user: {
                        avatar: `data:${element.avatarBuffer.contentType};base64, ${element.avatarBuffer.data}`,
                        name: user.username,
                        tag: user.discriminator
                    },
                    bots: (await mongo.Bots.find().or([{ owner: user.id }, { "details.otherOwners": user.id }]).exec()).map(partialBotObject),
                    title: user.username
                }) : res.render("message", {
                    message: "Usuário não encontrado!"
                });
            });
            
        });
    });
    return router;
};