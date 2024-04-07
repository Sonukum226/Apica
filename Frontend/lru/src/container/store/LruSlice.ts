import { createModule } from "saga-slice";
import submitLruDataSaga from "./sagas/submitLruDataSaga";
import fetchLruDataSaga from "./sagas/getLruDara";

// initaial state
const initialState = {
  lruData: {},
  isSubmitting:false,
  isSubmited: false,
};

const LruSlice = createModule({
  name: "lru",
  initialState,
  reducers: {
    submitLruData: (state: any) => {
      state.isSubmitting = true;
      state.isSubmited = false;
    },
    fetchLruData:(state:any) =>{
      state.isSubmitting = true;
      state.isSubmited = false;
    },
    fetchLruDataSuccess: (state: any, action:any) => {
      state.isSubmitting = false;
      state.isSubmited = true;
      state.lruData = action.payload;
    },
  },

  sagas: (actions) => ({
    *[actions.submitLruData]({ payload }) {
      yield submitLruDataSaga(actions, payload);
    },
    *[actions.fetchLruData]({ payload }) {
      yield fetchLruDataSaga(actions, payload);
    },
  }),
});

export const { submitLruData, fetchLruData, fetchLruDataSuccess } = LruSlice.actions;

export const LruSelector = (state: any) => state.appReducer.lru;
export default LruSlice;
