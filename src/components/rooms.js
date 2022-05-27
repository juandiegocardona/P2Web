
import React, { useState, useEffect } from "react";
import Devices from "./devices";
import sala from "../assets/sala.png";
import comedor from "../assets/comedor.png";
import cocina from "../assets/cocina.jpg";
import { FormattedMessage } from 'react-intl';

function Rooms (props) {

    let [rooms, setRooms] = useState([]);
    let [selectedRoom, setSelectedRoom] = useState();

    // Read JSON with PWA
    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        if(!navigator.onLine) {
            if(localStorage.getItem("rooms") === null) {
                setRooms("Loading rooms...");
            } else {
                setRooms(JSON.parse(localStorage.getItem("rooms")));
            }
        } else {
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                let roomsBySpace = data.filter((d) => d.homeId === props.espacioSelecionado);
                setRooms(roomsBySpace);
                localStorage.setItem("rooms", JSON.stringify(roomsBySpace));
            });
        }
        setSelectedRoom();
    }, [props.espacioSelecionado]);

      // Update state with selected room
    function roomSelector (room) {
        setSelectedRoom(room);
    }
    function imageSelector (room) {
        if(room === "Living room") {
            return sala;
        } else if(room === "Kitchen") {
            return cocina;
        } else if(room === "Dinner room") {
            return comedor;
        }
    }

    return(
        <div className="container mt-4 mb-5">
            <h1><FormattedMessage id="MyRooms"/></h1>
            <div className="row mt-4">
                <div className={selectedRoom != null ? "col-8": ""}>
                    <div className="row">
                        {rooms.map((c) => {
                            return(
                                <div className="col" key={c.name}>
                                    <div className="card" onClick={() => roomSelector(c)}>
                                        <div className="card-body">
                                            <h5 className="card-title"><FormattedMessage id={c.name}/></h5>
                                        </div>
                                        <img src={imageSelector(String(c.name))} className="card-img-top" alt={c.name} style={{height: "14rem"}}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={selectedRoom != null ? "col-4": ""}>
                    {selectedRoom != null ? <Devices dispositivosCuarto={selectedRoom.devices} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Rooms;