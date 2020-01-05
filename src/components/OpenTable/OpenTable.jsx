import React from 'react';
import styles from './OpenTable.module.css';

let OpenTable = (props) => {
    const url = `https://api.myjson.com/bins/swb9o`;
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={()=>props.onSelect(url)}>Click here to open the table, please:)</button>
        </div>
    )
}
export default OpenTable;