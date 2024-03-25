import React, { useState } from "react";
import { useDispatch } from "react-redux";
import filtersSlice from "../../redux-toolkit/filtersSlice";

const statusList = ["In stock", "On Sale"]
function Status() {
    const [collapse, setCollapse] = useState(false)
    const dispatch = useDispatch()
    return (
        <div className="accordion-item py-2 d-flex flex-column justify-content-center">
            <h5 className="accordion-header">
                <span role="button" className={`accordion-button ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    Product Status
                </span>
            </h5>
            {
                collapse && (
                    <div className="form-group">
                        {
                            statusList.map((status, index) => (
                                <div key={index} className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox" value={status}
                                        onClick={() => dispatch(filtersSlice.actions.setSearchStatus(status))}
                                    />
                                    <label className="form-check-label">{status}</label>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Status;