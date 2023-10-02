import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { connetionMysql } from "./src/config/db.js";
import { __dirname } from "./src/helpers/upload-file.js";

import userRoutes from "./src/routes/user.js";
import eventRoutes from "./src/routes/event.js";
import orderRoutes from "./src/routes/order.js";
import reviewRoutes from "./src/routes/review.js";
import promoRoutes from "./src/routes/promo.js";
import referralRoutes from "./src/routes/referral.js";
import attendeeRoutes from "./src/routes/attendee.js";

import errorHandler from "./src/utils/error-handler.js";
import notFound from "./src/utils/not-found.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static(`public`));

connetionMysql();

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/attendee", attendeeRoutes);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
