import { Request, Response } from "express";
import {
  authenticate,
  registerNewUser,
  generateAccessToken,
} from "./AuthController";

const options = {
  path: "/api/v1/refresh",
  maxAge: 1000 * 60 * 60 * 24 * 90,
  httpOnly: true,
  secure: false,
  signed: false,
};

export default [
  {
    path: "/api/v1/signup",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = registerNewUser(email, password);

        res
          .cookie("refreshToken", refreshToken, options)
          .status(200)
          .send({ auth: true, accessToken });
      },
    ],
  },
  {
    path: "/api/v1/signin",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = authenticate(email, password);

        res
          .cookie("refreshToken", refreshToken, options)
          .status(200)
          .send({ auth: true, accessToken });
      },
    ],
  },
  {
    path: "/api/v1/refresh/token",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;
        const accessToken = generateAccessToken(refreshToken);

        res.status(200).send({ auth: true, accessToken });
      },
    ],
  },
];
