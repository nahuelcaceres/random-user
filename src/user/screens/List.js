import React from 'react';
import styled from 'styled-components';

import UserCard from '../components/UserCard';
import {useUsers} from '../hooks';
import {Link} from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const BottomLine = styled.div`
    width: 0;
    height:0;
    opacity: 0;
`;

function ListScreen() {
  const [users, fetchMore] = useUsers();
  const bottom = React.useRef();

  /*    
    React nos brinda un lugar/espacio donde almacenar algo.
        const bottom = React.useRef(); 

    Despues pasamos esa referencia al elemento para asignar esa referencia.
    Con esto, tenemos ese elemento fuera del return(....).
        <BottomLine ref={bottom}>
    
  */
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            intersections => {
                //Saber si el elemento entra o sale de la pantalla
                const isShowing = intersections[0].isIntersecting;
                
                if(isShowing){
                    console.log("triggered");
                    fetchMore();
                }
            },
            {
                rootMargin: "45px",
                threshold: 1,
            }
        );

        observer.observe(bottom.current);

        //return observer.disconnect;
    }, [fetchMore]);


  return (
    <>
        <h1>Usuarios:</h1>
        <Container>

            {users.map(user => (
                <Link key={user.id} to={`/users/${user.email}`}>
                    <UserCard  user={user} />
                </Link>
            ))}

        </Container>
        <BottomLine ref={bottom} />
    </>

    )
    
}

export default ListScreen;
