export const subscribersKeys = {
  all: [{ scope: 'subscribers' }] as const,
  lists: () => [{ ...subscribersKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...subscribersKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...subscribersKeys.details()[0], id }] as const
};
