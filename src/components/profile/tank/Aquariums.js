import React from 'react';

import { Box, Mask, Heading, Collage, Image, Card } from 'gestalt';
import TankMenu from './TankMenu';
import RemoveTank from './RemoveTank';
import AddImages from './AddImages';

const Aquariums = ({ profile, session }) => {
  const tanks = profile.tanks;
  const profileId = profile.id;

  const ownsProfile = profileId === session.me.profile.id;

  return tanks.map(tank => {
    return (
      <Box justifyContent='center' display='block' key={tank.id}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginBottom={4}
        >
          <Box color='white' width={550} height={550} shape='rounded'>
            <Box
              alignItems='center'
              display='flex'
              padding={1}
              justifyContent='between'
              direction='row'
            >
              <Box
                alignItems='center'
                display='flex'
                marginRight={10}
                flex='grow'
              >
                <Heading size='xs'>{tank.title}</Heading>
              </Box>
              {ownsProfile ? (
                <React.Fragment>
                  <Box
                    direction='row'
                    justifyContent='end'
                    marginLeft={10}
                    flex='shrink'
                    dangerouslySetInlineStyle={{
                      __style: {
                        zIndex: 1
                      }
                    }}
                  >
                    <AddImages profileId={profileId} tankId={tank.id} />
                  </Box>
                  <Box direction='row' justifyContent='end' flex='shrink'>
                    <RemoveTank profileId={profileId} tankId={tank.id} />
                  </Box>
                </React.Fragment>
              ) : null}
            </Box>
            <Card>
              <Collage
                columns={3}
                cover
                width={550}
                height={550}
                gutter={3}
                renderImage={({ index, width, height }) => {
                  const coverImage = {
                    color: '#000',
                    naturalHeight: 806,
                    naturalWidth: 564,
                    src: `${tank.images[0] && tank.images[0].url}`
                  };
                  const nonCoverImages = [
                    {
                      color: 'rgb(111, 91, 77)',
                      naturalHeight: 751,
                      naturalWidth: 564,
                      src: `${tank.images[1] && tank.images[1].url}`
                    },
                    {
                      color: 'rgb(231, 186, 176)',
                      naturalHeight: 200,
                      naturalWidth: 98,
                      src: `${tank.images[tank.images.length - 1] &&
                        tank.images[tank.images.length - 1].url}`
                    }
                  ];
                  const image =
                    index === 0 ? coverImage : nonCoverImages[index - 1];
                  return (
                    <Mask
                      width={width}
                      height={height}
                      shape='rounded'
                      padding={10}
                    >
                      <Image
                        alt='cover image'
                        src={image.src}
                        color={image.color}
                        naturalHeight={image.naturalHeight}
                        naturalWidth={image.naturalWidth}
                        fit='cover'
                      />
                    </Mask>
                  );
                }}
              />
            </Card>
          </Box>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          padding={10}
        >
          <TankMenu tank={tank} session={session}/>
        </Box>
      </Box>
    );
  });
};

export default Aquariums;
