import React from 'react';
import  styles from './Table.module.css';

let Table = props => (
  <table className={styles.table} style={{ cursor: "pointer" }}>
    <thead>
      <tr>
        <th onClick={props.onSorting.bind(null, "id")}>
          ID {props.sortBy === "id" ? <small>{props.sorting}</small> : null}
        </th>
        <th onClick={props.onSorting.bind(null, "name")}>
          Name{" "}
          {props.sortBy === "name" ? <small>{props.sorting}</small> : null}
        </th>
        <th onClick={props.onSorting.bind(null, "surname")}>
          Surname{" "}
          {props.sortBy === "surname" ? <small>{props.sorting}</small> : null}
        </th>
        <th onClick={props.onSorting.bind(null, "age")}>
          Age{" "}
          {props.sortBy === "age" ? <small>{props.sorting}</small> : null}
        </th>
        
      </tr>
    </thead>
    <tbody>
      {props.data.map(u => (
        <tr
          key={u.id}
          
        >
          <td>{u.id}</td>
          <td>{u.name}</td>
          <td>{u.surname}</td>
          <td>{u.age}</td>
         
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;