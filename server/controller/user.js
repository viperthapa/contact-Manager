const User = require("../model/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/user");
const config = require("../config/config");

//function to register the user details
exports.registerUser = async function (req, res) {
    try {
        //Get the user input 
        const { email, password } = req.body;

        //Validate the user input
        if (!(email && password)) {
            res.status(400).send("All fields is required");
        }

        //check if the email already exist in db 
        const oldEmail = await User.findOne({ email });
        if (oldEmail) {
            res.status(409).send("User with this email already exist!")
        }
        //encrypt the password that user provided using plain text
        encryptedPassword = await bcrypt.hash(password, 10);

        //create user in db
        const user = await User.create({
            email: email,
            password: encryptedPassword

        })

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}


//login
exports.loginUser = (req, res) => {

    //check if the user is already in db 
    User.findOne({ email: req.body.email })
        .populate("password", "token")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            //check if there is user
            if (!user) {
                return res.status(404).send({ message: "User Not found!" });
            }

            //check if the provided password same as a db password
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: config.tokenLife });
            const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                token: token,
                refreshToken: refreshToken
            });

        });
};

