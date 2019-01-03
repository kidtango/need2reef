import React from 'react';
import { Box, Toast, Image, Button } from 'gestalt';

export default function confirmationToast() {
  return (
    <Box>
      <Box
        fit
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 50,
            left: '50%',
            transform: 'translateX(-50%)'
          }
        }}
        paddingX={1}
        position='fixed'
      >
        <Toast
          text={['Saved to', 'Home decor']}
          thumbnail={
            <Image
              alt='Saved to home decor board'
              naturalHeight={564}
              naturalWidth={564}
              src='/gestalt/static/media/stock1.291c62ad.jpg'
            />
          }
        />
      </Box>
    </Box>
  );
}
