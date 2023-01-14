import React from 'react';
import {Container, Icon} from "semantic-ui-react";
import {itemsData} from "./HowMyCoursesWork.data";
import { map, maps } from 'lodash';
import "./HowMyCoursesWork.scss";

export function HowMyCoursesWork ()  {
    return (
        <Container className='how-my-courses-work'>
            <h2>¿CÓMO FUNCIONA LA WEB?</h2>
            <h4>Esta web contara con un soporte de administradores para que controle que todo funcione correctamente
            </h4>

            <div className='how-my-courses-work__items'>
                {map(itemsData,(item,index)=>(
                    <div key={index}>
                        <div>
                            <Icon name={item.icon}></Icon>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}

