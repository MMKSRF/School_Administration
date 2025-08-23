import React from 'react';
import {FaExclamation, FaInfoCircle} from "react-icons/fa";

function GetPriorityIcon({priority}) {
        switch(priority) {
            case 'high':
                return <FaExclamation className="text-red-500 text-lg" />;
            case 'medium':
                return <FaInfoCircle className="text-yellow-500 text-lg" />;
            default:
                return <FaInfoCircle className="text-indigo-500 text-lg" />;
        }
}



export default GetPriorityIcon;