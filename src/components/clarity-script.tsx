'use client';

import React, { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

type Props = {
  projectId: string;
};

const ClarityScript: React.FC<Props> = ({ projectId }): null => {
  useEffect(() => {
    Clarity.init(projectId);
  }, [projectId]);

  return null;
};

export default ClarityScript;
