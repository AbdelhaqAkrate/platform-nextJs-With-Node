import React from "react";
import Navigation from "./Navbar";
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Heading , Text , SimpleGrid} from "@chakra-ui/react";


const Champion = ({champions})=>
{
      const orig = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'
    
    return(
      
        <SimpleGrid columns={[1,2,3]} spacing="40px">
            {champions.map((champion)=>{
                return(
                <div key={champion.id}>
                    <a href={'/champions/'+champion.id} >
                    <img src={`${orig+champion.id}_0.jpg`} width={300} height={400}/>
                    <Heading as="h4" align="center" size="md" className={styles.champName} textColor="gold" background=" rgba(0, 0, 0, 0.589);" padding={10} position="relative" top={-80}>{champion.id}</Heading>
                    </a>
                </div>
                )})}
        </SimpleGrid>
      
    )
}
export default Champion;