import React, { useState } from "react";
import styles from './styles.module.css';
import data from "configurations/data";

// type MultiSelectProps = {
//     data: any,
//     value?: any,
//     onChange: (value: any) => void,
//     onSearch: (value: any) => void,
// }

const isEmpty = (val) => val.length === 0;

// function MultiSelect({data, value, onChange, onSearch}: MultiSelectProps) {
function MultiSelect() {
    const [chipClick, setChipClick] = useState({id: 0});
    const [clicked, setClicked] = useState(false);
    const [options, setOptions] = useState(data);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleClick = (item) => {
        const newOptions = options?.filter((val) => val?.id !== item?.id)
        setOptions(newOptions);
        setSelectedOptions([...selectedOptions, item]);
        setChipClick(item);
    }

    const handleCross = (item, e) => {
        e.stopPropagation();
        const newSelectedOptions = selectedOptions?.filter((val) => val?.id !== item?.id);
        setSelectedOptions(newSelectedOptions);
        setOptions([...options, item]);
    }

    const handleDropDown = (e) => {
        e.stopPropagation(); 
        setClicked((prev) => !prev);
    }

    const handleChipClick = (item, e) => {
        e.stopPropagation(); 
        setChipClick(item);
    }

    return (
    <div className={styles.container}>
        <div className={styles.upper_container} onClick={() => setChipClick({id: 0})}>
            <div className={styles.option_container}>
                {isEmpty(selectedOptions) ? <div className={styles.placeholder}>Add Items</div> : 
                (selectedOptions || []).map((item) => {
                    return (
                    <div
                        key={item?.id} 
                        className={`${styles.chip} ${chipClick?.id === item?.id ? styles.chip_click : ''}`} 
                        onClick={(e) => handleChipClick(item, e)}
                    >
                        <div className={styles.chip_left}>{item?.name}</div>
                        <div className={styles.chip_right} onClick={(e) => handleCross(item, e)}>X</div>
                    </div>)
                })
                }
            </div>
            <div onClick={(e) => handleDropDown(e)} 
                className={`${styles.drop_down_icon} ${clicked ? styles.cliked_dropdown_icon : ''}`}
            >V</div>
        </div>
        {clicked ? <div className={styles.lower_container}>
            {isEmpty(options) ? <div className={styles.empty_state}>No options to show</div> :
            (options || []).map((item) => {
                return (
                    <div key={item?.id} className={styles.option} onClick={() => handleClick(item)}>
                        <div>{item?.name}</div>
                        <div>{item?.email}</div>
                    </div>
                )
            })
            }
        </div> : null}
    </div>
    )
}

export default MultiSelect;