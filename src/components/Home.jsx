import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Menu from './Menu';
import TeamPowerstats from './TeamPowerstats';
import HeroDetails from './HeroDetails';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo,faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Instrucciones from './Instrucciones';
import Form from './Form';
import Spinner from './spinner/Spinner';

const Home = () => {
  const [loading, setLoading] = useState(false);

  //State of menu
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState(false);
  const [getHero, setGetHero] = useState('');

  const [heroes, setHeroes] = useState(null);

  //State of the team
  const [badHero, setBadHero] = useState(
    JSON.parse(localStorage.getItem('BADS')) || []
  );
  const [goodHero, setGoodHero] = useState(
    JSON.parse(localStorage.getItem('GOODS')) || []
  );
  const [team, setTeam] = useState([...goodHero, ...badHero]);

  //ESTADOS POWERSTATS
  const [powerstats, setPowerstats] = useState(
    JSON.parse(localStorage.getItem('POWST')) || {
      combate: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0,
      peso: 0,
      altura: 0,
    }
  );

  const formRef = useRef();

  //BUSCARDOR DE HEROES
  //
  const appId = '10223353236392867';
  const url = `https://www.superheroapi.com/api.php/${appId}/search/${getHero}`;

  useEffect(() => {
    if (getHero.lenght !== 0) {
      axios.get(url).then((response) => setHeroes(response.data.results));
    }
    return () => {};
  }, [url, getHero]);

  const searchHero = ({ target }) => {
    if (search.lenght === 0) return;
    setSearch(target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setGetHero(search);
    formRef.current.reset();
    setTimeout(() => {
      setLoading(false);
      setMenu(true);
    }, 2000);
  };

  const nullValue = (hero) => {
    if (hero) {
       let { combat, durability, intelligence, power, speed, strength } =
        hero.powerstats;

      let { height, weight } = hero.appearance;
      if (combat === 'null') {
        combat = 50;
      }

      if (durability === 'null') {
        durability = 25;
      }

      if (intelligence === 'null') {
        intelligence = 30;
      }

      if (power === 'null') {
        power = 50;
      }

      if (speed === 'null') {
        speed = 75;
      }

      if (strength === 'null') {
        strength = 40;
      }
      if (height[1] === '0 cm') {
        height[1] = '100 cm';
      }
      if (weight[1] === '0 kg') {
        weight[1] = '70 kg';
      }
    }
  };
  const handleAdd = (hero) => {
    let { combat, durability, intelligence, power, speed, strength } =
      hero.powerstats;

    let { height, weight } = hero.appearance;

    nullValue(hero);

    if (team.includes(hero)) {
      alert(`Este heroe ya es parte de tu equipo`);
      return;
    }

    if (team.length === 6) {
      return;
    }

    setPowerstats({
      combate: powerstats.combate + parseInt(combat),
      durability: powerstats.durability + parseInt(durability),
      intelligence: powerstats.intelligence + parseInt(intelligence),
      power: powerstats.power + parseInt(power),
      speed: powerstats.speed + parseInt(speed),
      strength: powerstats.strength + parseInt(strength),
      peso: powerstats.peso + parseInt(weight[1].slice(0, 3).trim()),
      altura: powerstats.altura + parseInt(height[1].slice(0, 3).trim()),
    });

    localStorage.setItem(
      'POWST',
      JSON.stringify({
        combate: powerstats.combate + parseInt(hero.powerstats.combat),
        durability:
          powerstats.durability + parseInt(hero.powerstats.durability),
        intelligence:
          powerstats.intelligence + parseInt(hero.powerstats.intelligence),
        power: powerstats.power + parseInt(hero.powerstats.power),
        speed: powerstats.speed + parseInt(hero.powerstats.speed),
        strength: powerstats.strength + parseInt(hero.powerstats.strength),
        peso:
          powerstats.peso +
          parseInt(hero.appearance.weight[1].slice(0, 3).trim()),
        altura:
          powerstats.altura +
          parseInt(hero.appearance.height[1].slice(0, 3).trim()),
      })
    );

    if (hero.biography.alignment === 'bad') {
      if (badHero.length === 3) {
        alert(
          `Ya tenes tus 3 Villanos,AHORA solo agrega a los
         ${3 - goodHero.length} buenos`
        );
        return;
      }
      setTeam([...team, hero]);

      setBadHero([...badHero, hero]);
      localStorage.setItem('BADS', JSON.stringify([...badHero, hero]));
    }

    if (hero.biography.alignment === 'good') {
      if (goodHero.length === 3) {
        alert(
          `Ya tenes tus 3 HEROES,AHORA solo agrega a los 
          ${3 - badHero.length} Villanos`
        );
        return;
      }
      setTeam([...team, hero]);
      setGoodHero([...goodHero, hero]);
      localStorage.setItem('GOODS', JSON.stringify([...goodHero, hero]));
    }
    setMenu(false);
  };

  const eliminarHero = (hero) => {
    const newGroup = team.filter((heroe) => hero.id !== heroe.id);

    setTeam(newGroup);

    const newBadGroup = badHero.filter((heroe) => hero.id !== heroe.id);
    setBadHero(newBadGroup);
    localStorage.setItem('BADS', JSON.stringify(newBadGroup));

    const newGoodGroup = goodHero.filter((heroe) => hero.id !== heroe.id);
    setGoodHero(newGoodGroup);

    localStorage.setItem('GOODS', JSON.stringify(newGoodGroup));

    let { combat, durability, intelligence, power, speed, strength } =
      hero.powerstats;

    let { height, weight } = hero.appearance;
    setPowerstats({
      combate: powerstats.combate - parseInt(combat),
      durability: powerstats.durability - parseInt(durability),
      intelligence: powerstats.intelligence - parseInt(intelligence),
      power: powerstats.power - parseInt(power),
      speed: powerstats.speed - parseInt(speed),
      strength: powerstats.strength - parseInt(strength),
      peso: powerstats.peso - parseInt(weight[1].slice(0, 3).trim()),
      altura: powerstats.altura - parseInt(height[1].slice(0, 3).trim()),
    });
    localStorage.setItem(
      'POWST',
      JSON.stringify({
        combate: powerstats.combate - parseInt(combat),
        durability: powerstats.durability - parseInt(durability),
        intelligence: powerstats.intelligence - parseInt(intelligence),
        power: powerstats.power - parseInt(power),
        speed: powerstats.speed - parseInt(speed),
        strength: powerstats.strength - parseInt(strength),
        peso: powerstats.peso - parseInt(weight[1].slice(0, 3).trim()),
        altura: powerstats.altura - parseInt(height[1].slice(0, 3).trim()),
      })
    );
  };

  return (
    <>
      <div className="position-relative">
        {team.length === 6 ? (
          <h1 className="text-center m-5 p-5"> Felicictaciones!!!! Tu equipo esta completo!! </h1>
        ) : (
          <Form
            getSearch={getSearch}
            formRef={formRef}
            searchHero={searchHero}
            team={team}
            search={search}
          />
        )}

        {loading ? (
          <div className="w-100 d-flex justify-content-center">
            <Spinner />
          </div>
        ) : menu ? (
          <>
            <Menu
              setMenu={setMenu}
              heroes={heroes}
              handleAdd={handleAdd}
              team={team}
              goodHero={goodHero}
              badHero={badHero}
            />
          </>
        ) : team.length === 0 ? (
          <Instrucciones />
        ) : (
          <>
            <div className="container">
              <h2 className="text-center">MI EQUIPO DE HEROES</h2>
            </div>

            <div className="container">
              <div className="row ">
                <TeamPowerstats
                  team={team}
                  powerstats={powerstats}
                  combate={powerstats.combate}
                  durability={powerstats.durability}
                  intelligence={powerstats.intelligence}
                  power={powerstats.power}
                  speed={powerstats.speed}
                  strength={powerstats.strength}
                  peso={powerstats.peso}
                  altura={powerstats.altura}
                />

                <hr className="mt-5" />

                <div className="col-12 col-md-12">
                  <div className="row">
                    <p className="text-center">
                      {team.length === 0
                        ? `Tenes que elegir 3 Villanos y 3 SuperHeroes`
                        : null}
                    </p>
                    <span className="h1 text-center">
                      {goodHero.length === 0 ? null : `Good Heros`}
                    </span>

                    {goodHero.map((bueno) => (
                      <div className="col-sm-12 col-lg-4" key={bueno.id}>
                        <div className="card">
                          <img src={bueno.image.url} alt="" />
                          <div className="card-img-overlay">
                            <div className="fondo">
                              <div className="card-header fw-bold d-flex w-100 justify-content-between">
                                <p>{bueno.name} </p>
                                
                                <div>
                                  <button
                                    className="mx-1 "
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <FontAwesomeIcon icon={faInfo} />
                                  </button>

                                  <HeroDetails team={team} />
                                  <button onClick={() => eliminarHero(bueno)}
                                  >
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                  </button>
                                </div>
                              </div>

                              <div className="card-body text-white fw-bold ">
                                <p className="card-text text-white m-0">
                                  Combat: {bueno.powerstats.combat}
                                </p>
                                <p className="card-text m-0">
                                  Durability: {bueno.powerstats.durability}
                                </p>
                                <p className="card-text m-0">
                                  Intelligence: {bueno.powerstats.intelligence}
                                </p>
                                <p className="card-text m-0">
                                  Power: {bueno.powerstats.power}
                                </p>
                                <p className="card-text m-0">
                                  Speed: {bueno.powerstats.speed} km
                                </p>
                                <p className="card-text m-0">
                                  Strength: {bueno.powerstats.strength}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-md-12">
                  <div className="row">
                    <span className="h1 text-center">
                      {badHero.length === 0 ? null : `Bad Heros`}
                    </span>
                    {badHero.map((malo) => (
                      <div className="col-sm-12 col-lg-4" key={malo.id}>
                        <div className="card">
                          <img src={malo.image.url} alt="" />
                          <div className="card-img-overlay">
                            <div className="fondo">
                              <div className="card-header fw-bold d-flex w-100 justify-content-between">
                                <p>{malo.name} </p>
                                <div>
                                  <button
                                    className="mx-1 mx-sm-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    <FontAwesomeIcon icon={faInfo} />
                                  </button>

                                  {/* <!-- Modal --> */}
                                  <HeroDetails team={team} />
                                  <button onClick={() => eliminarHero(malo)}>
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                  </button>
                                </div>
                              </div>

                              <div className="card-body text-white fw-bold py-2">
                                <p className="card-text text-white m-0">
                                  Combat: {malo.powerstats.combat}
                                </p>
                                <p className="card-text m-0">
                                  Durability: {malo.powerstats.durability}
                                </p>
                                <p className="card-text m-0">
                                  Intelligence: {malo.powerstats.intelligence}
                                </p>
                                <p className="card-text m-0">
                                  Power: {malo.powerstats.power}
                                </p>
                                <p className="card-text m-0">
                                  Speed: {malo.powerstats.speed} km
                                </p>
                                <p className="card-text m-0">
                                  Strength: {malo.powerstats.strength}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
