import { useQuery } from 'react-query';

import { getProfile } from 'api/profile';

export default function useProfile() {
  const { data: profile }: any = useQuery('profile', async () => {
    const response = await getProfile();

    return response;
  });

  return profile?.data;
}
