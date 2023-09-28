import { useEffect } from 'react';

/**
 * Empty dependency array useEffect
 * @param func the main function to run on mountion of the component
 * @returns useEffect with empty dependency array
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (func: () => void) => useEffect(func, []);
