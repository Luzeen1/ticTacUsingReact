import React from 'react';



export default ({ i, onbtnClickedHandler,cell }) => {
        let value = '?';
        if (!!cell) {
                value = cell;
        }
        return (<li key={i} onClick={(e) => onbtnClickedHandler(i)} className="tic" id={i}>{value}</li>)
       
};
