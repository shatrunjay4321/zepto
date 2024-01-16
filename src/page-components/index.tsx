import React from 'react';
import styles from './styles.module.css';
import data from '../configurations/data';
import MultiSelect from './MultiSelect';

function App () {
  return (
    <div className={styles.main_container}>
      <h1 className={styles.header}>Pick Users</h1>
      <div className={styles.content}><MultiSelect data={data} /></div>
    </div>
  )
}

export default App;
