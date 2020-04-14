import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Item from './Item';

const TypeList = ({type, items}) => {
    const isMobile = useMediaQuery({ maxWidth: 700 });

    return (
        <tr>
            <td style={{width: isMobile ? '80px' : '130px', textAlign: 'left', fontWeight: 'bold'}}>{type}</td>
            <td>
                {
                    items.map(item => {
                        return <Item key={item.name} {...item}/>
                    })
                }
            </td>
        </tr>
    );
}

export default TypeList;