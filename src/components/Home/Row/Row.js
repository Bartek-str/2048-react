import React from "react";
import Cell from "../Cell";

const Row = ({ row }) => {
    return (
        <tr className='row'>
            {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
        </tr>
    );
};

export default Row;