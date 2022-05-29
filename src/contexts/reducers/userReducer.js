import db from "../../db";

const userReducer = async (state, action) => {
  switch (action.type) {
    case "UPDATE_SCORE":
      let updated = await db.players.update(action.payload.id, {
        score: action.payload.score,
      });
      return { ...state, score: action.payload.score };
      break;
    case "UPDATE_USER":
      return { ...state, ...action.payload };
      break;

    default:
      break;
  }
};

export default userReducer;
