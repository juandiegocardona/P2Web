
import React, { useState, useEffect } from "react";
import Rooms from "./rooms";
import house from "../assets/house.png";
import apartment from "../assets/apartment.png";
import { FormattedMessage } from 'react-intl';


function Spaces () {

    let [spaces, setSpaces] = useState([]);
    let [selectedSpace, setSelectedSpace] = useState();

     // Read JSON with PWA
    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        if(!navigator.onLine) {
            if(localStorage.getItem("spaces") === null) {
                setSpaces("Loading spaces...");
            } else {
                setSpaces(JSON.parse(localStorage.getItem("spaces")))
            }
        } else {
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                setSpaces(data);
                localStorage.setItem("spaces", JSON.stringify(data));
            });
        }
    }, [])

    // Update state with selected space
    function spaceSelector (espacio) {
        setSelectedSpace(espacio);
    }

    return(
        <div className="container mt-4">
            <div className="row">
                {spaces.map((e) => {
                    return(
                        <div className="col-3" key={e.id}>
                            <div className="card" onClick={() => spaceSelector(e)}>
                                <img src={String(e.name).startsWith("Casa")? house : apartment} className="card-img-top" alt={e.name} style={{height: "15rem"}}/>
                                <div className="card-body">
                                    <h5 className="card-title"><FormattedMessage id={e.name}/></h5>
                                    <p className="card-text">{e.address}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedSpace != null ? <Rooms espacioSelecionado={selectedSpace.id} />: null}
        </div>
    );
}

export default Spaces;