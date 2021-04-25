require('dotenv').config();

const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token')

//let refreshToken = [];
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            });

            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    const token = jwt.sign(
                        {userId: user._id},
                        process.env.RANDOM_TOKEN_SECRET,
                        {expiresIn: '24h'}
                    )
                    const tokentosave = new Token({token:token ,user:user});

                    //refreshToken.push(token);
                    tokentosave.save();

                    //console.log(refreshToken);

                    res.status(200).json({
                        userId: user._id,
                        token,
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

