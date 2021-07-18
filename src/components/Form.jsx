import React from 'react';

const Form = ({ getSearch, formRef, searchHero, team, search }) => {
  return (
    <form className="search-form" onSubmit={getSearch} ref={formRef}>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          aria-describedby="button-addon2"
          onChange={searchHero}
          disabled={team.length === 6}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
          disabled={search === '' || team.length === 6}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Form;
