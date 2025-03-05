import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { storyReducer } from "./storyReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  story: storyReducer,
});
