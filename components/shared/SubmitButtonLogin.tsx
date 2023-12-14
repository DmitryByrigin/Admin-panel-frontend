import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/button';

export function SubmitButtonLogin() {
  return (
    <Button
      type="submit"
      className="text-sm font-normal text-default-600 bg-default-100 p-6"
      variant="flat">
      Login
    </Button>
  );
}
