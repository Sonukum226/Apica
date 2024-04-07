import axios from "axios";
import { call, put } from "redux-saga/effects";
import { ErrorSwal, SuccessSwal, commanHeaders } from "../../../utils";
import { BASE_URL } from "../../constant";

export default function* fetchLruDataSaga(
  action: any,
  payload: any
): Generator {
  try {
    const URL = `${BASE_URL}get?key=${payload.toString()}`;
    const HTTPARGS = [URL, commanHeaders()];
    const responseData = yield call<any>(axios.get, ...HTTPARGS);
    const {
      data: { code, key, value, msg },
    }: any = responseData;
    if (code === "200") {
      const payload = {
        key,
        value,
      };
      yield put(action.fetchLruDataSuccess({ payload }));
      SuccessSwal("Data Fetched Successfully");
    } else if (code === "400") {
      ErrorSwal(msg);
    }
  } catch (error: any) {
    ErrorSwal(error.message);
  }
}
