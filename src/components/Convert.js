import React, { useState, useEffect } from 'react';

const Convert = ({ language, text }) => {
  useEffect(() => {
    console.log('text or language has been changed');
  }, [language, text]);

  return <div></div>;
};

export default Convert;
