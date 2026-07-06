import { generateToken } from "../data/token.js";

export async function login(req, res) {
        console.log(req.body);

    const { email, password } = req.body;
    if (email === "admin@gmail.com" && password === "123456") {
        const token = generateToken({ id: 1, email: email });
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
}