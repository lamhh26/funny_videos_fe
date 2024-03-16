import { createContext } from "react";
import actionCable from "actioncable";

export const CableContext = createContext(null);

export const CableApp = {};
CableApp.cable = actionCable.createConsumer(process.env.REACT_APP_WEBSOCKET_URL);
