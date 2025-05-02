interface State {
  data: NotificationList[];
}

interface Action {
  type: "SET" | "ADD";
  data?: NotificationList[];
  payload?: NotificationList;
}

export const initialState: State = {
  data: [],
};

export const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        data: action.data ?? [],
      };
    case "ADD":
      return {
        ...state,
        data: [...state.data, action.payload!],
      };
    default:
      return state;
  }
};
