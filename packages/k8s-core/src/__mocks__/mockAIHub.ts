import type { AIHubKind } from '../k8sTypes';

type MockAIHub = {
  instancesNamespace?: string;
};

export const mockAIHub = ({
  instancesNamespace = 'odh-model-registries',
}: MockAIHub = {}): AIHubKind => ({
  apiVersion: 'components.platform.opendatahub.io/v1alpha1',
  kind: 'AIHub',
  metadata: {
    name: 'default-aihub',
  },
  spec: {
    instancesNamespace,
  },
});
