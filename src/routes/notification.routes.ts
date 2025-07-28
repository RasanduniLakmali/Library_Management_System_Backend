import {Router} from "express";
import {sendNotification} from "../controller/notification.controller";


const notificationRouter = Router();

notificationRouter.post("/send", sendNotification);

export default notificationRouter;