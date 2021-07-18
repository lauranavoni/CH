import React from 'react';

const TeamPowerstats = ({ team, powerstats }) => {
  let { peso, altura } = powerstats;

 
  const powerstArray = Object.entries(powerstats).slice(0, 6);

  
  const orderArray = powerstArray.sort(function (a, b) {
    return a[1] - b[1];
  });

  orderArray.reverse();

  const sacarPromedio = (atr) => {
    let promedio = atr / team.length;
    return promedio.toFixed(2);
  };

  return (
    <div className="col-lg-4 offset-lg-4 ">
      <ul className="list-group">
        {orderArray.map((hab) => (
          <li
            key={hab[0]}
            className="list-group-item d-flex justify-content-between align-items-center h5 text-capitalize"
          >
            {hab[0]}
            <span className="badge bg-info rounded-pill ">{hab[1]}</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between align-items-center h5">
         Peso Promedio
          <span className="badge bg-info rounded-pill">
            {peso !== 0 ? sacarPromedio(peso) : 0} Kg
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center h5">
          Altura Promedio
          <span className="badge bg-info rounded-pill">
            {altura !== 0 ? sacarPromedio(altura) : 0} Cm
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TeamPowerstats;
