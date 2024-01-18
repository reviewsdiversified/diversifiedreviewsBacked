import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (requiest, response) => {
    const { username, email, phoneNumber,city, password,role } = requiest.body;
    if (!username || !email || !phoneNumber || !city || !password) {
        response.json({
            success: false,
            message: 'All fields are mandetory !'
        })
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        response.json({
            success: false,
            message: 'User already register !'
        })
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        phoneNumber,
        city,
        password: hashedPassword,
        role
    });

    if (user) {
        response.json({
            _id: user.id,
            message: "User registered Successfully",
            success: true,
        });
    } else {
        response.status(400);
        response.json('User data is not valid');
    }
});

const loginUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    if (!email, !password) {
        response.status(400);
        response.json({
            success: false,
            message: 'All fiels are Mandetory !'
        })
    }
    const checkUser = await User.findOne({ email });
    //Compare password with hashes Password
    if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: checkUser.username,
                    email: checkUser.email,
                    phoneNumber: checkUser.phoneNumber,
                    city:checkUser.city,
                    id: checkUser.id,
                    role: checkUser?.role
                }
            },
            process.env.ACCCES_TOKEN_SECRET,
            { expiresIn: '1day' }
        );
        const finalData = {
            accessToken,
            user: {
                _id: checkUser._id,
                email: checkUser?.email,
                username: checkUser?.username,
                phoneNumber: checkUser?.phoneNumber,
                city: checkUser?.city,
                role: checkUser?.role
            },
        }
        response.json({
            success: true,
            message: "Login successfully !",
            data: finalData
        })

    } else {
        response.status(401);
        response.json({
            success: false,
            message: 'Email or Password Not valid'
        })
    }
});

const currentUser = asyncHandler(async (request, response) => {
    response.json(request.user);
})

export {
    registerUser,
    loginUser,
    currentUser
};