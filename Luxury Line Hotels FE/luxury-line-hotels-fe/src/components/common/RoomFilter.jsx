import {useState} from "react";

const RoomFilter = ({data, setFilteredData}) => {

  const [roomFilter, setRoomFilter] = useState("");
  const [hotelFilter, setHotelFilter] = useState("");

  const handleRoomTypeChange = (e) => {
      const selectedRoomType = e.target.value;
      setRoomFilter(selectedRoomType);
      filterData(selectedRoomType, hotelFilter);
  };

  const filterData = (roomType) => {
      const filteredRooms = data.filter((room) => {
          return roomType ? room.roomType?.toLowerCase().includes(roomType.toLowerCase()) : true;
      });
      setFilteredData(filteredRooms);
  };

  const clearFilter = () => {
      setRoomFilter("");
      setHotelFilter("");
      setFilteredData(data);
  };

  const roomTypes = [...new Set(data.map((room) => room.roomType))];
  const hotelNames = [...new Set(data.map((room) => room.hotelName).filter((name) => name))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text">
        Filter by room type
      </span>
      <select className="form-select"
              value={roomFilter}
              onChange={handleRoomTypeChange}>
        <option value={""}>Select room type</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={String(type)}>{String(type)}</option>
          ))}
      </select>
      <button onClick={clearFilter}
              className="uni-button red-button"
              style={{borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;