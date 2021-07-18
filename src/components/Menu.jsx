import React from 'react';

const Menu = ({ setMenu, heroes, handleAdd, team, goodHero, badHero }) => {
  return (
    <div>
      <div className="d-flex w-100 justify-content-end">
        <button
          className="btn btn-info mb-2 text-white"
          onClick={() => setMenu(false)}
        >
          X
        </button>
      </div>
      <div className="container position-fixed w-100 h-50 overflow-auto">
        <div className="col">
          <div className="row ">
            <ul className="list-group">
              {heroes?.map((hero) => (
                <li
                  className="heroList list-group-item d-flex justify-content-between align-items-center"
                  key={hero.id}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <img
                      className="rounded"
                      src={hero.image.url}
                      alt={hero.name}
                      width="40"
                    />
                    <p className="m-2"> {hero.name} - </p>

                    {hero.biography.alignment === 'good' && (
                      <p className="badge bg-success my-2 text-uppercase">
                        {hero.biography.alignment}
                      </p>
                    )}

                    {hero.biography.alignment === 'neutral' && (
                      <p className="badge bg-secondary my-2 text-uppercase">
                        {hero.biography.alignment}
                      </p>
                    )}

                    {hero.biography.alignment === 'bad' && (
                      <p className="badge bg-danger my-2 text-uppercase">
                        {hero.biography.alignment}
                      </p>
                    )}
                  </div>
                  <button
                    className="btn btn-pink"
                    onClick={() => handleAdd(hero)}
                    disabled={
                      team.length === 6 ||
                      hero.biography.alignment === '-' ||
                      hero.powerstats.combat === 'null' ||
                      hero.biography.alignment === 'neutral' ||
                      (hero.biography.alignment === 'good' &&
                        goodHero.length === 3) ||
                      (hero.biography.alignment === 'bad' &&
                        badHero.length === 3) ||
                      team.includes(hero)
                    }
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
