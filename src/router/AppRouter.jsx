import { lazy, useEffect } from 'react';

import {} from 'react-router-dom';
import {} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentArtist } from '@/redux/auth/selectors';
import { useNavigate, useLocation, useRoutes } from 'react-router-dom';
import { useAppContext } from '@/context/appContext';

import routes from './routes';

export default function AppRouter() {
  let location = useLocation();
  const navigate = useNavigate();
  const { state: stateApp, appContextAction } = useAppContext();
  const currentArtist = useSelector(selectCurrentArtist);
  const { app } = appContextAction;

  const routesList = [];

  Object.entries(routes).forEach(([key, value]) => {
    routesList.push(...value);
  });

  function getAppNameByPath(path) {
    for (let key in routes) {
      for (let i = 0; i < routes[key].length; i++) {
        if (routes[key][i].path === path) {
          return key;
        }
      }
    }
    // Return 'default' app  if the path is not found
    return 'default';
  }
  useEffect(() => {
    let boarded = currentArtist.boarded;
    // console.log(currentArtist);
    if (!boarded && !location.pathname.includes('boarding')) {
      navigate('/boarding');
    }
    if (location.pathname === '/') {
      app.default();
    } else {
      const path = getAppNameByPath(location.pathname);
      app.open(path);
    }
  }, [location]);

  let element = useRoutes(routesList);

  return element;
}
