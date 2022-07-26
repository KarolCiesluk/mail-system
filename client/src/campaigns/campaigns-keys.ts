export const campaignsKeys = {
  all: [{ scope: 'campaigns' }] as const,
  lists: () => [{ ...campaignsKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...campaignsKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...campaignsKeys.details()[0], id }] as const
};
