import React from 'react';
import { useParams } from 'react-router-dom';

const ModPage = () => {
  const { id } = useParams();

  return (
    <div className="mods-main">
      hi! this page's url parameter is {id}.
    </div>
  );
};

export default ModPage