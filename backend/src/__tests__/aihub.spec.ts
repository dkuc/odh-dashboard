import { fetchAIHub } from '../utils/aihub';
import type { KubeFastifyInstance } from '../types';

const getClusterCustomObject = jest.fn();
const mockFastify = {
  kube: {
    customObjectsApi: { getClusterCustomObject },
  },
  log: { error: jest.fn() },
} as unknown as KubeFastifyInstance;

describe('fetchAIHub', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get the default cluster-scoped AIHub resource', async () => {
    const aiHub = {
      metadata: { name: 'default-aihub' },
      spec: { instancesNamespace: 'rhoai-model-registries' },
    };
    getClusterCustomObject.mockResolvedValue({ body: aiHub });

    await expect(fetchAIHub(mockFastify)).resolves.toEqual(aiHub);
    expect(getClusterCustomObject).toHaveBeenCalledWith(
      'components.platform.opendatahub.io',
      'v1alpha1',
      'aihubs',
      'default-aihub',
    );
  });

  it('should return null and log an error when AIHub is unavailable', async () => {
    getClusterCustomObject.mockRejectedValue({ response: { body: 'Not found' } });

    await expect(fetchAIHub(mockFastify)).resolves.toBeNull();
    expect(mockFastify.log.error).toHaveBeenCalledWith('Failure to fetch AIHub: Not found');
  });
});
