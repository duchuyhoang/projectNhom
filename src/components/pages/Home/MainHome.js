import React from 'react';
import { Footer } from '@Components/components/Footer/Footer';
import { Stretcher } from '@Components/components/Stretcher/Stretcher';
import { ServiceComponent } from '@Components/components/ServiceComponent/ServiceComponent';
import { FindHomeComponent } from '@Components/components/FindHomeComponent/FindHomeComponent';
import CNProgressBar from '@Components/shared/CNProgressBar/CNProgressBar';
import RoomCard from '@Components/components/RoomCard/RoomCard';
import { HomeListRoom } from './HomeListRoom';
import FeaturedRoom from './FeaturedRoom';

const MainHome = (props) => {
  return (
    <>
      <FindHomeComponent />
      <ServiceComponent />
      {/* <RoomCard /> */}
      <FeaturedRoom />
      <Stretcher />
      <Footer />
    </>
  );
};

export default MainHome;
