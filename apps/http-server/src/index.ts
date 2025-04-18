import express from 'express';
import { client } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/sign-up", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await client.user.create({
            data: {
                username,
                password,
            },
        });
        res.status(200).json({
            message: "User created successfully",
            id: user.id,
        })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(3002);

