import React from 'react';
import ProfileMenu from './ProfileMenu';
import PersonalMenuBar from '../navbar/PersonalMenuBar';

const PersonalProfile = ({ session }) => {
  return (
    <React.Fragment>
      <PersonalMenuBar />;
      <ProfileMenu profileId={session.me.profile.id} />
    </React.Fragment>
  );
};

export default PersonalProfile;
