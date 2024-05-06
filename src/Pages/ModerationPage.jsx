import React from "react";
import Moderation from "../modules/marathon/Moderation";

const AdminPanel = ({ setFirst }) => {
  return (
    <div className="web">
      <Moderation setFirst={setFirst} />
    </div>
  );
};

export default AdminPanel;
