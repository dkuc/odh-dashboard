import type { AIHubKind } from '@odh-dashboard/k8s-core';
import useFetchState, { FetchState } from '@odh-dashboard/ui-core/hooks/useFetchState';
import axios from '@odh-dashboard/ui-core/utilities/axios';

const fetchAIHub = (): Promise<AIHubKind | null> =>
  axios
    .get('/api/aihub')
    .then((response) => response.data)
    .catch((e) => {
      if (e.response?.status === 404) {
        return null;
      }
      throw new Error(e.response?.data?.message || e.message);
    });

const useFetchAIHub = (): FetchState<AIHubKind | null> => useFetchState(fetchAIHub, null);

export default useFetchAIHub;
