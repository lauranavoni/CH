import React from 'react';

const HeroDetails = ({ team }) => {
  return (
    <>
      {team.map((hero) => (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          key={hero.id}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-uppercase"
                  id="exampleModalLabel"
                >
                  {hero.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Weight: {hero.appearance.weight[1]}</p>
                <p>Height: {hero.appearance.height[1]}</p>
                <p>Alias: {hero.biography.aliases[0]}</p>

                <p>Eyes: {Object.entries(hero.appearance)[4][1]}</p>
                <p>Hair: {Object.entries(hero.appearance)[5][1]}</p>

                <p>Base: {hero.work.base}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HeroDetails;
