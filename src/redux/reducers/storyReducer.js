import {
  CREATE_STORY_FAILURE,
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  GET_STORY_REQUEST,
  GET_STORY_SUCCESS,
  UPDATE_STORY_SUCCESS,
} from "../actions/storyActions";

const initialState = {
  loading: false,
  stories: null,
  error: null,
};

export const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STORY_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_STORY_SUCCESS:
      return { ...state, loading: false, error: null };
    case CREATE_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_STORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_STORY_SUCCESS:
      return { ...state, loading: false, stories: action.payload };
    case UPDATE_STORY_SUCCESS:
      const { id, contributions } = action.payload;
      if (
        state.stories[id].contributions.length ===
        state.stories[id].maxContributions
      ) {
        return;
      } else {
        return {
          ...state,
          loading: false,
          stories: {
            ...state.stories,
            [id]: {
              ...state.stories[id],
              contributions,
            },
          },
        };
      }
    default:
      return state;
  }
};
