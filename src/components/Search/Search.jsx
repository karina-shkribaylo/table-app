import React, {useState} from 'react'
import styles from './Search.module.css';

let Search = props => {
    const [value, setValue] = useState('')
    const valueChangeHandler = event => {
        setValue(event.target.value)
      }

    return (
      <>
        <div >
          <div className={styles.btnInput}>
            <button
              className={styles.btn}
              onClick={() => props.onSearch(value)}
            >
              Search
            </button>
          </div>
          <input
            type="text"
            className={styles.input}
            onChange={valueChangeHandler}
            value={value}
          />
        </div>
        <p className="text-center">Click on the title to sort</p>
      </>
    );
}

export default Search;