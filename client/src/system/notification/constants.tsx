import React, { ReactNode } from 'react';

interface Notification {
  version: string;
  message: string;
  description: ReactNode | string;
  duration: number;
}

const notifications: Notification[] = [
  {
    version: '4.1.0',
    message: 'Annotations Manager',
    description: (
      <div>
        You can now access your annotations through our new Annotations Manager
        feature. Just click on the "Annotations" button at the top of your video
        page.
      </div>
    ),
    duration: null
  }
];

export default notifications;
