import { useState } from "react";
import InputText from "../components/InputText";
import { useDispatch, useSelector } from "react-redux";
import { LruSelector, fetchLruData, submitLruData } from "./store/LruSlice";
import { ErrorSwal } from "../utils";
import { Button } from "reactstrap";
import styled from "styled-components";
import Model from "../components/Model";

const MainCon = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ButtonCon = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Lru = (props: any) => {
  const dispatch = useDispatch();
  const { lruData, isSubmitting } = useSelector(LruSelector);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [getKey, setGetKey] = useState("");
  const [toggleLru, setToggleLru] = useState("");
  const [model, setShowModel] = useState(false);

  const onSubmit = () => {
    if (key === "" && value === "") {
      ErrorSwal("Please Provide proper Key");
    } else if (value === "") {
      ErrorSwal("Please Provide proper Value");
    } else {
      const payload = {
        key: key,
        val: value,
      };
      //@ts-ignore
      dispatch(submitLruData(payload));

      setKey("");
      setValue("");
    }
  };

  const onGetData = () => {
    if (getKey === "") {
      ErrorSwal("Please Provide Key to search");
    } else {
      //@ts-ignore
      dispatch(fetchLruData(getKey));
      setShowModel(!model);
      setGetKey("");
    }
  };
  return (
    <MainCon>
      <p>Experience the LRU Cache</p>
      <ButtonCon>
        <Button color="primary" onClick={() => setToggleLru("set")}>
          Set Lru Cache
        </Button>
        <Button color="primary" onClick={() => setToggleLru("get")}>
          Get Lru Cache
        </Button>
      </ButtonCon>
      {toggleLru === "set" && (
        <>
          <InputText
            value={key}
            onChange={(e: any) => setKey(e.target.value)}
            title={"Key"}
          />
          <InputText
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            title={"value"}
          />
          <Button color="primary" onClick={() => onSubmit()}>
            Submit
          </Button>{" "}
        </>
      )}

      {toggleLru === "get" && (
        <>
          <InputText
            value={getKey}
            onChange={(e: any) => setGetKey(e.target.value)}
            title={"Provide Key to get value"}
          />
          <Button color="primary" onClick={() => onGetData()}>
            Submit
          </Button>
        </>
      )}

      <Model
        modal={!isSubmitting && model}
        toggle={setShowModel}
        title={"LRU cache Details"}
        data={lruData}
      />
    </MainCon>
  );
};

export default Lru;

