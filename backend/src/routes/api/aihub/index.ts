import { KubeFastifyInstance } from '../../../types';
import { getAIHub } from '../../../utils/resourceUtils';

export default async (fastify: KubeFastifyInstance): Promise<void> => {
  fastify.get('/', async () => getAIHub(fastify) ?? null);
};
