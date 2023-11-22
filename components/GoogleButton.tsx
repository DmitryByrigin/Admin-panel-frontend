import { Button } from '@nextui-org/button';

import React from 'react';
import { GoogleIcon } from './icons';
import { loginGoogle } from '@/lib/actions';

function GoogleButton() {
  return (
    <form action={loginGoogle}>
      <Button
        type="submit"
        value="google"
        className="text-sm font-normal text-default-600 bg-default-100 p-6"
        variant="flat"
        startContent={<GoogleIcon />}>
        Sign up with Google
      </Button>
    </form>
  );
}

export default GoogleButton;
