import { createContext } from "react";
import actionCable from "actioncable";

export const CableContext = createContext(null);

export const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");
