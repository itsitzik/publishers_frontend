import { lazy, Suspense, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectAuth, selectCurrentArtist } from '@/redux/auth/selectors';
import { AppContextProvider } from '@/context/appContext';
import PageLoader from '@/components/PageLoader';
import AuthRouter from '@/router/AuthRouter';
import Localization from '@/locale/Localization';
import { notification } from 'antd';

const ErpApp = lazy(() => import('./ErpApp'));
const BoardingApp = lazy(() => import('./BoardingApp'));

const DefaultApp = ({ children }) => (
  <Localization>
    <AppContextProvider>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </AppContextProvider>
  </Localization>
);

export default function PublishingOs() {
  const { isLoggedIn } = useSelector(selectAuth);
  const currentArtist = useSelector(selectCurrentArtist);

  // // Online state
  // const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect(() => {
  //   // Update network status
  //   const handleStatusChange = () => {
  //     setIsOnline(navigator.onLine);
  //     if (!isOnline) {
  //       console.log('🚀 ~ useEffect ~ navigator.onLine:', navigator.onLine);
  //       notification.config({
  //         duration: 20,
  //         maxCount: 1,
  //       });
  //       // Code to execute when there is internet connection
  //       notification.error({
  //         message: 'No internet connection',
  //         description: 'Cannot connect to the Internet, Check your internet network',
  //       });
  //     }
  //   };

  //   // Listen to the online status
  //   window.addEventListener('online', handleStatusChange);

  //   // Listen to the offline status
  //   window.addEventListener('offline', handleStatusChange);

  //   // Specify how to clean up after this effect for performance improvment
  //   return () => {
  //     window.removeEventListener('online', handleStatusChange);
  //     window.removeEventListener('offline', handleStatusChange);
  //   };
  // }, [navigator.onLine]);
  if (!isLoggedIn)
    return (
      <Localization>
        <AuthRouter />
      </Localization>
    );
  else {
    if (!currentArtist.boarded) {
      return (
        <DefaultApp>
          <BoardingApp />
        </DefaultApp>
      );
    } else {
      return (
        <DefaultApp>
          <ErpApp />
        </DefaultApp>
      );
    }
  }
}
