import { Modal } from "antd";
import React from "react";

function ViewMessage({ setOpenModal, openModal, loading, content }) {
  return (
    <Modal
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={"90%"}
      bodyStyle={{ padding: 24, backgroundColor: "whitesmoke" }}
      style={{ top: 8 }}
      footer={null}
    >
      ViewMessage
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </Modal>
  );
}

export default ViewMessage;
