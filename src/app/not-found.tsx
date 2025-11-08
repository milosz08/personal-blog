'use client';

import Link from 'next/link';
import React from 'react';

function NotFoundPage(): React.ReactElement {
  return (
    <>
      <h1>404 - nie znaleziono</h1>
      <Link href="/">Strona główna</Link>
    </>
  );
}

export default NotFoundPage;
