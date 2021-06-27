import express from "express";
import { controlCommands, readCommands, sysCommands } from "../config/commands";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Tello server online");
});

router.get("/commandList", async (req, res) =>
  // send the command list to the user
  res.json({
    controlCommands,
    readCommands,
    sysCommands,
  })
);

export const commandRouter = router;
