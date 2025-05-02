import { useState, useEffect } from 'react';
import { getHotelNames } from '../utilities/APIfunctions.js';

const HotelNameSelector = ({ handleRoomInputChange, newRoom, showAddNewHotelName, preselectedHotelName, isDisabled }) => {

    const [hotelNames, setHotelNames] = useState([""]);
    const [newHotelName, setNewHotelName] = useState("");

    useEffect(() => {
        getHotelNames().then((data) => {
            if (Array.isArray(data)) {
                setHotelNames(data.filter(name => name && name.trim() !== ""));
            }
        }).catch(error => {
            console.error("Failed to fetch hotel names:", error);
        });
    }, []);

    useEffect(() => {
        if (preselectedHotelName && !newRoom.hotelName) {
            handleRoomInputChange({ target: { name: "hotelName", value: preselectedHotelName } });
        }
    }, [preselectedHotelName, handleRoomInputChange, newRoom.hotelName]);

    const handleNewHotelNameInputChange = (e) => {
        setNewHotelName(e.target.value);
    };

    const handleAddNewHotelName = () => {
        if (newHotelName !== "") {
            setHotelNames([...hotelNames, newHotelName]);
            setNewHotelName("");
        }
    };

    return (
        <>
            {hotelNames.length > 0 && (
                <div className='input-group'>
                    <select
                        required
                        id='hotelName'
                        name='hotelName'
                        className='form-control'
                        value={newRoom.hotelName}
                        onChange={(e) => handleRoomInputChange(e)}
                        disabled={isDisabled}
                    >
                        <option value={""}>Select hotel</option>
                        {hotelNames.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {showAddNewHotelName && !isDisabled && (
                <div className='input-group mt-3'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Enter new hotel name'
                        value={newHotelName}
                        onChange={handleNewHotelNameInputChange}
                    />
                    <button className='btn btn-outline-success' type='button' onClick={handleAddNewHotelName}>
                        Add New Hotel Name
                    </button>
                </div>
            )}
        </>
    );
};

export default HotelNameSelector;