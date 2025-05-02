import { useState } from "react";

const RoomTypeFilter = ({data, setFilteredData}) => {

    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = [...new Set(data.map((room) => room.roomType))]

    return (
      <div className="input-group mb-4" style={{boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", borderRadius: "7px"}}>
        <span className="input-group-text">Filter rooms by type</span>
        <select className="form-select" value={filter} onChange={handleSelectChange}>
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

export default RoomTypeFilter;