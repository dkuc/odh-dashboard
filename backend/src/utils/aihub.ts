import { AIHubKind, KubeFastifyInstance } from '../types';

const AIHUB_API_GROUP = 'components.platform.opendatahub.io';
const AIHUB_API_VERSION = 'v1alpha1';
const AIHUB_PLURAL = 'aihubs';
const DEFAULT_AIHUB_NAME = 'default-aihub';

export const fetchAIHub = async (fastify: KubeFastifyInstance): Promise<AIHubKind | null> =>
  fastify.kube.customObjectsApi
    .getClusterCustomObject(AIHUB_API_GROUP, AIHUB_API_VERSION, AIHUB_PLURAL, DEFAULT_AIHUB_NAME)
    .then((res) => res.body as AIHubKind)
    .catch((e) => {
      fastify.log.error(`Failure to fetch AIHub: ${e.response?.body || e.message}`);
      return null;
    });
