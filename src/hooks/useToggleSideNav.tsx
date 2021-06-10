import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

export default function useToggleSideNav() {
  const queryClient = useQueryClient();
  const { data: collapsed }: any = useQuery('showSideNav');
  const toggleSideNav = useCallback(() => {
    queryClient.setQueryData('showSideNav', (data) => !data);
  }, [queryClient]);
  return { collapsed, toggleSideNav };
}
