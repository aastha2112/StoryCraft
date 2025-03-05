// action constants

import { baseUrl } from "../../firebase/firebaseConfig.js";
import axios from "axios";

export const CREATE_STORY_REQUEST = "CREATE_STORY_REQUEST";
export const CREATE_STORY_SUCCESS = "CREATE_STORY_SUCCESS";
export const CREATE_STORY_FAILURE = "CREATE_STORY_FAILURE";

export const GET_STORY_REQUEST = "GET_STORY_REQUEST";
export const GET_STORY_SUCCESS = "GET_STORY_SUCCESS";
export const GET_STORY_FAILURE = "GET_STORY_FAILURE";

export const UPDATE_STORY_REQUEST = "UPDATE_STORY_REQUEST";
export const UPDATE_STORY_SUCCESS = "UPDATE_STORY_SUCCESS";
export const UPDATE_STORY_FAILURE = "UPDATE_STORY_FAILURE";
// action creators

export const createStoryRequest = () => {
  return {
    type: CREATE_STORY_REQUEST,
  };
};
export const createStory =
  (title, firstSentence, author) => async (dispatch) => {
    dispatch({ type: CREATE_STORY_REQUEST });
    const newStory = {
      title,
      createdBy: author,
      contributions: [
        {
          sentence: firstSentence,
          contributedBy: author,
          timestamp: new Date().toISOString(),
        },
      ],
      maxContributions: 10,
      createdAt: new Date().toISOString(),
      status: "ongoing",
    };

    try {
      let res = await axios.post(`${baseUrl}/stories.json`, newStory);
      console.log(res.data, "create story success");
      dispatch({ type: CREATE_STORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error, "creating story failed");
      dispatch({
        type: CREATE_STORY_FAILURE,
        payload: error.message,
      });
    }
  };

export const getStory = () => async (dispatch) => {
  dispatch({ type: GET_STORY_REQUEST });
  try {
    let res = await axios.get(`${baseUrl}/stories.json`);
    dispatch({ type: GET_STORY_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateStory =
  (id, story, contribution, author) => async (dispatch) => {
    dispatch({ type: UPDATE_STORY_REQUEST });
    try {
      const updatedContributions = [
        ...(story.contributions || []),
        {
          sentence: contribution,
          contributedBy: author,
          timestamp: new Date().toISOString(),
        },
      ];

      let res = await axios.patch(`${baseUrl}/stories/${id}.json`, {
        contributions: updatedContributions,
      });

      dispatch({
        type: UPDATE_STORY_SUCCESS,
        payload: { id, contributions: updatedContributions },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_STORY_FAILURE, payload: error.message });
    }
  };
