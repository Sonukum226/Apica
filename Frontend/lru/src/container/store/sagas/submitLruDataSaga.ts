import axios from "axios";
import { call } from "redux-saga/effects";
import { ErrorSwal, SuccessSwal, commanHeaders } from "../../../utils";
import { BASE_URL } from "../../constant";

export default function* submitLruDataSaga(
  action: any,
  payload: any
): Generator {
  try {
    const URL = `${BASE_URL}add`;

    const HTTPARGS = [URL, payload, commanHeaders()];

    const responseData = yield call<any>(axios.post, ...HTTPARGS);
    const {
      data: { code, msg },
    }: any = responseData;
    if (code === "200") {
      SuccessSwal(msg);
    }
  } catch (error: any) {
    ErrorSwal(error.message);
  }
}
