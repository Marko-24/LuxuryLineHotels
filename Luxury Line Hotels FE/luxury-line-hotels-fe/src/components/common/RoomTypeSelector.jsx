import { useState, useEffect } from 'react';
import { getRoomTypes } from '../utilities/APIfunctions.js';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom, showAddNewRoomType }) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
        }
    }

    return (
      <>
        {roomTypes.length > 0 && (
          <div className='input-group'>
            <select required
                    id='roomType'
                    name='roomType'
                    className='form-control'
                    value={newRoom.roomType}
                    onChange={(e) => handleRoomInputChange(e)}>
              <option value={""}>Select room type</option>
              {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
        {showAddNewRoomType && (
          <div className='input-group mt-3'>
            <input className='form-control'
                   type='text'
                   placeholder='Enter new room type'
                   value={newRoomType}
                   onChange={handleNewRoomTypeInputChange}
            />
            <button className='btn btn-outline-success' type='button' onClick={handleAddNewRoomType}>
              Add New Room Type
            </button>
          </div>
        )}
      </>
    );
};

export default RoomTypeSelector;