import express from "express";
import * as authAdminUserController from "@controllers/authAdminUser.controller";

const authAdminUserRouter = express.Router();

authAdminUserRouter.route("/register").post(authAdminUserController.register);
authAdminUserRouter
  .route("/verify-register-email")
  .post(authAdminUserController.verifyRegisterEmail);
authAdminUserRouter.route("/login").post(authAdminUserController.login);
authAdminUserRouter.route("/refresh").post(authAdminUserController.refresh);
authAdminUserRouter
  .route("/request-forget-password-email")
  .post(authAdminUserController.requestForgetPasswordEmail);
authAdminUserRouter
  .route("/verify-change-password-email")
  .post(authAdminUserController.verifyChangePasswordEmail);

export default authAdminUserRouter;
