import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const scrollToTop = () => {
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location]);

  return null;
};

