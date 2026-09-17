import * as resourceUtils from '../utils/resourceUtils';
import { getModelRegistryNamespace } from '../routes/api/modelRegistries/modelRegistryUtils';
import type { AIHubKind, KubeFastifyInstance } from '../types';

const mockFastify = {
  log: { error: jest.fn() },
} as unknown as KubeFastifyInstance;

describe('getModelRegistryNamespace', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the instances namespace from the AIHub spec', () => {
    const aiHub: AIHubKind = {
      metadata: { name: 'default-aihub' },
      spec: { instancesNamespace: 'rhoai-model-registries' },
    };
    jest.spyOn(resourceUtils, 'getAIHub').mockReturnValue(aiHub);

    expect(getModelRegistryNamespace(mockFastify)).toBe('rhoai-model-registries');
  });

  it('should not use the DSC status namespace', () => {
    const aiHub: AIHubKind = {
      metadata: { name: 'default-aihub' },
      spec: { instancesNamespace: 'aihub-registries' },
    };
    jest.spyOn(resourceUtils, 'getAIHub').mockReturnValue(aiHub);

    expect(getModelRegistryNamespace(mockFastify)).toBe('aihub-registries');
  });

  it('should throw when AIHub does not report an instances namespace', () => {
    jest.spyOn(resourceUtils, 'getAIHub').mockReturnValue({
      metadata: { name: 'default-aihub' },
      spec: {},
    });

    expect(() => getModelRegistryNamespace(mockFastify)).toThrow(
      'Model registry namespace not found in AIHub spec',
    );
  });
});
