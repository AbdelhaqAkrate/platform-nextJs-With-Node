import Head from 'next/head'
import { useRouter } from "next/router";
import Image from 'next/image';
import axios from "axios";
import styles from '../../styles/Home.module.css'
import { useEffect , useState } from "react";
import Navbar from '../../components/Navbar'
import { Card , Grid , Col } from "@nextui-org/react";
import {  Flex,Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export default function Detail()
{
    
    //using UseRouter hook to extract segment data from a dynamic route

    const router = useRouter();
    const query = router.query;
    

    //Use useState to get fetched data
    const [champions , setChampions] = useState({champion : [] , spells : [] , skins : [] , passive : null })
  

    //fetch api to get data of one champion 
  
    useEffect(()=>{
    
 axios.get(`https://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion/${query.name}.json`)
        .then(result=>{
        
            var championData = Object.keys(result.data.data);
            const obj = result.data.data
              console.log(obj)
                    championData.map(data=>{
                     
                            var championName = data;
                            var res = Object.fromEntries(Object.entries(obj).filter(([key]) => key.includes(championName)));
                            console.log(res)
                        
                        for (const key in res) {
                            if (Object.hasOwnProperty.call(res, key)) 
                            {
                                var element = res[key];
                               setChampions({champion : element , spells : element.spells , skins : element.skins , passiveImg : element.passive.image.full , passive : element.passive.name, passiveDescription : element.passive.description})
                              
                            }
                            
                        }
                    })
                   
        })}
   )

   //image path
   const orig = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/'
   const skill = 'http://ddragon.leagueoflegends.com/cdn/11.14.1/img/spell/'
   const passive = `http://ddragon.leagueoflegends.com/cdn/11.14.1/img/passive/${champions.passiveImg}`
   const splach = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${query.name}_`
        console.log(champions.skins)
    return(
        <Flex direction="column" justify="center" align="center" border="solid black" width="100%" className={styles.background}>
            <Head>
                <title>League Of Legends</title>
                <meta name="description" content="Generated by Kankuro" />
                <link rel="icon" href="/icons8-league-of-legends-color-32.ico" />
            </Head>
            <Navbar />
            <div className={styles.gridContent} >
                <div className={styles.gridDisplay}>
                <div className={styles.leftSection}>
                     <img src={`${orig+champions.champion.id}_0.jpg`} width={300} height={400}  />
                </div>

                <div className={styles.rightSection}>
                    <h1 className={styles.name}>{champions.champion.id}</h1>
                    <h2 className={styles.nickname}>{champions.champion.title}</h2>
                    <p className={styles.lore}>{champions.champion.lore}</p>
                    {/* {champion.skins.map(skin=>(
                        <div key={skin.id}>
                            <p>{skin.num}</p>
                        </div>
                        
                    ))} */}
                </div>
                </div>
            </div>
           
           {/* skills section */}


            <div className={styles.gridContent} >
                <div className={styles.skills}>
                
                    <Tabs className={styles.tabs}>
                        <TabList className={styles.skillsImg}>
                            <Tab className={styles.tab} > 
                            <img className={styles.skill} src={`${passive}`} alt="" srcset="" width={90} height={90}  /> 
                            </Tab>
                            {champions.spells.map((spell)=>(
                            <Tab className={styles.tab} key={spell.id}> 
                            <img className={styles.skill} src={`${skill+spell.image.full}`} alt="" srcset="" width={90} height={90}  /> 
                            </Tab>
                            ))}
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                 <p className={styles.descript}>{champions.passive}</p>
                            <p className={styles.descript}>{champions.passiveDescription}</p>
                            </TabPanel>
                             {champions.spells.map((spell)=>(
                            <TabPanel key={spell.id}>
                            <p className={styles.descript}>{spell.name}</p>
                            <p className={styles.descript}>{spell.description}</p>
                            </TabPanel>
                              ))}
                        </TabPanels>
                    </Tabs>

                </div>
            </div>
                                
            <div className={styles.gridContent}>
                <div className={styles.skins}>
                    <h1 className={styles.skinTitle}>Skins</h1>
                        <Grid.Container gap={2} justify="center">
                            {champions.skins.map(skin=>(
                            <Grid xs={12} sm={4} key={skin.id}>
                                <Card>
                                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                    <Col color='red'>
                                        <Text className={styles.skinName} h4 color="white">
                                        {skin.name}
                                        </Text>
                                    </Col>
                                    </Card.Header>
                                    <Card.Image
                                    src={`${splach+skin.num}.jpg`}
                                    objectFit="fill"
                                    width="100%"
                                    height={340}
                                    alt="skin image"
                                    className={styles.fit}
                                    />
                                </Card>
                            </Grid>
                            ))}

                        </Grid.Container>
                </div>
            </div>
                            










            <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/icons8-league-of-legends-color-32.png" alt="Vercel Logo" width={18} height={18} />
          </span>
        </a>
      </footer>
        </Flex>
    )
}
