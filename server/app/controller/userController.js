const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/App.models");

const generateJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (user) {
                return next(new ApiError("User already exists", 400));
            }
            const hash = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email,
                password: hash,
            });
            const token = generateJWT(newUser);
            res.status(201).json({
                message: "User created",
                token,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(new ApiError.notFound("User not found", 404));
            }
            const isValid = await bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return next(new ApiError.forbidden("Invalid password", 400));
            }
            const token = generateJWT(user.id, user.email, user.role);
            return res.json({
                message: "User authorized",
                token,
            });
        } catch (error) {
            next(error);
        }
    }

    async check(req, res, next) {   
        const token = generateJWT(req.user.id, req.user.email, req.user.role);
        return res.json({
            message: "User authorized",
            token,
        });
    }

    async logout(req, res, next) {
        try {
            res.clearCookie("token");
            return res.json({
                message: "User logged out",
            });
        } catch (error) {
            next(error);
        }
    }




    // async registration(req, res, next) {
    //     const {email, password, role} = req.body
    //     const hashPassword = await bcrypt.hash(password, 5)
    //     const user = await User.create({email, password: hashPassword})
    //     const token = generateJwt(user.id, user.email, user.role)
    //     return res.json({token})
    // }

    // async login(req, res, next) {
    //     const {email, password} = req.body
    //     const user = await User.findOne({where: {email}})
    //     if (!user) {
    //         return next(ApiError.internal('Пользователь не найден'))
    //     }
    //     let comparePassword = bcrypt.compareSync(password, user.password)
    //     if (!comparePassword) {
    //         return next(ApiError.internal('Указан неверный пароль'))
    //     }
    //     const token = generateJwt(user.id, user.email, user.role)
    //     return res.json({token})
    // }

    // async check(req, res, next) {
    //     const token = generateJwt(req.user.id, req.user.email, req.user.role)
    //     return res.json({token})
    // }
}

module.exports = new UserController()
