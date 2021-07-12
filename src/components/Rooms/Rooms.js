import React from "react";
import Room from "../Room/Room";

const Rooms = ({ rooms }) => {
  return (
    <div className="mt-5 d-flex justify-content-center flex-wrap w-100 mb-5 ">
      {rooms.map((room) => (
        <div>
          <Room key={room.id} room={room} />
        </div>
      ))}
    </div>
  );
};

export default Rooms;
