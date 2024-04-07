import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styled from "styled-components";

interface ModelProps {
  title: string;
  modal: boolean;
  toggle: any;
  data: { key: string; value: string };
}

const DataCon = styled.div`
  display: flex;
  flex-direction:row;
  gap: 2rem;
`;

const StringCon = styled.div`
    display: flex;
    gap: 0.5rem;
`

const Model = (props: ModelProps) => {
  const { modal, toggle, title, data } = props;
  return (
    <Modal isOpen={modal} toggle={()=>toggle()}>
      <ModalHeader toggle={()=>toggle()}>{title}</ModalHeader>
      <ModalBody>
        <DataCon>
          <StringCon><b>Key:</b>{data.key} </StringCon>
          <StringCon><b>Value:</b>{data.value} </StringCon>
        </DataCon>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle()}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Model;
